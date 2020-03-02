import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, Inject, PLATFORM_ID, ContentChildren, QueryList, ComponentRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiElementComponent } from 'src/app/_features/main/components/kii-element/kii-element.component';
import { MatTableDataSource } from '@angular/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, delay } from 'rxjs/operators';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';




@Component({
  selector: 'kii-paginator',
  templateUrl: './kii-paginator.component.html',
  styleUrls: ['./kii-paginator.component.scss']
})
export class KiiPaginatorComponent extends KiiBaseAbstract implements OnInit {

  /**Keyup on search */
  keyUp = new Subject<string>();

  /**Search value */
  valueSearch : string = "";

  /**Contains the current search */
  currentSearch : string = "";

  /**Items per page */
  @Input() itemsPage : number = 3;

  /**Full items list */
  @Input() data : any[] = [];

  /**Contains the result of elements to be displayed */
  @Output() result = new EventEmitter<any[]>();  

  /**Current displayed page */
  currentPage : number = 1;

  /**Number of lastPage */
  lastPage:number=1;

  _dataSource;


  icons : any = {
    left: faChevronLeft,
    right: faChevronRight,
    delete: faTimes
  }

  constructor(@Inject(PLATFORM_ID) private platform: any) { 
    super();
  }

  ngOnInit() {
    console.log("data is:",this.data);
    this._dataSource = new MatTableDataSource(this.data);
    this.setFilter();
    this.resetSearch();
    this.addSubscriber(
      this.keyUp.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(search => of(search).pipe(
          delay(100),
        )),
      ).subscribe(res => {
        this.currentPage = 1;
        console.log("Applying filter :",res);
        this.applyFilter(res);
        this.currentSearch = res;
      })
    )
  }
  ngOnChanges(changes:SimpleChanges) {
    if (changes.data) { 
      this.data = changes.data.currentValue;
      this._dataSource = new MatTableDataSource(this.data);
      this.setFilter();
      this.result.emit(this.getPagedElements(this._dataSource.data));
    }
  }

  ngAfterViewInit() {

  }

  /**Remove any search */
  resetSearch() {
    this.valueSearch = "";
    this.currentSearch = "";
    this.currentPage = 1;
    this.result.emit(this.getPagedElements(this._dataSource.data));
  }


   /**Applies the search filter */
   applyFilter(filterValue:string) {
    if(filterValue!== null) {
      this._dataSource.filter = filterValue.trim().toLowerCase();
      this._dataSource.filteredData.sort((a, b) => b.fweight - a.fweight); //Sort by matching criteria
      this.result.emit(this.getPagedElements(this._dataSource.filteredData));
   } 
  }

  /**Sets filtering criteria */
  setFilter() {
    let obj = this;
    this._dataSource.filterPredicate = function(data, filter: string): boolean {
      //Do not process when two short filter
      if (filter.length<=1) {
        data.fweight = 0;
        return true;
      }
      let weight = 0;
      let words = filter.split(" ");
      for (let word of words) {
        if(word.length>1) {  //Only process from two letters
            word = word.toLowerCase();
            weight = weight + obj._find(data.title,word)*2;
            weight = weight + obj._find(data.description,word)*1;
        }
      }
      data.fweight = weight;  //Add weight of search in data
      console.log("weight",data.fweight)
      if (weight>0)
       return true;
      else
       return false; 
    };
  }

  private _find(str, find) {
    let regex = new RegExp(find, "i"),result=false;
    return regex.exec(str)==null?0:1;
  }


  getPagedElements(elements:any[]) {
    //Calculate lastPage
    this.lastPage = Math.floor(elements.length/this.itemsPage);
    if (elements.length/this.itemsPage > this.lastPage) {
      this.lastPage = this.lastPage + 1;
    }

    let indexRight = (this.currentPage * this.itemsPage);
    let indexLeft = indexRight - this.itemsPage;
    indexRight = indexRight - 1;
    //When page is full
    let result = [];
    if (elements.length-1>= indexRight) {
      result = elements.slice(indexLeft,indexRight+1);
    } else {
      result = elements.slice(indexLeft,elements.length)
    }
    console.log("Emitting :",result);
    return result;
  }

  nextPage() {
    this.currentPage = this.currentPage+1;
    this.applyFilter(this.currentSearch);
  }

  previousPage() {
    this.currentPage = this.currentPage-1;
    if (this.currentPage<1) this.currentPage = 1;
    this.applyFilter(this.currentSearch);
  }  

}
