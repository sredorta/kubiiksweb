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
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin';




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

  /**Current data to work on */
  dataSource;

  /**Contains element displayed count */
  resultLength : number =0;

  @ViewChild('myInput', {static: true}) myInput: ElementRef;

  /**When input has focus */
  focus : boolean = false;

  icons : any = {
    left: faChevronLeft,
    right: faChevronRight,
    delete: faTimes,
    search: faSearchengin
  }

  constructor(@Inject(PLATFORM_ID) private platform: any) { 
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.setFilter();
    this.addSubscriber(
      this.keyUp.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(search => of(search).pipe(
          delay(100),
        )),
      ).subscribe(res => {
        this.currentPage = 1;
        this.valueSearch=res;
        this.applyFilter(res);
      })
    )
  }
  ngOnChanges(changes:SimpleChanges) {
    if (changes.data) { 
      this.dataSource = new MatTableDataSource(this.data);
      this.setFilter();
      this.applyFilter(this.valueSearch);
      this.result.emit(this.getPagedElements(this.dataSource.filteredData));
    }
  }



  /**Remove any search */
  resetSearch() {
    if (this.myInput) this.myInput.nativeElement.value = "";
    this.valueSearch="";
    this.currentPage = 1;
    this.setFilter();
    this.applyFilter(this.valueSearch);
    this.result.emit(this.getPagedElements(this.dataSource.filteredData));
  }

  /**Applies the search filter */
  applyFilter(filterValue:string) {
    if(filterValue!== "") {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filteredData.sort((a, b) => b.fweight - a.fweight); //Sort by matching criteria
      this.result.emit(this.getPagedElements(this.dataSource.filteredData));
    } else {
      this.dataSource.filteredData = this.dataSource.data;
      this.result.emit(this.getPagedElements(this.dataSource.filteredData));
    }
  }

  /**Sets filtering criteria */
  setFilter() {
    let obj = this;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      //Do not process when two short filter
      if (filter.length<=1) {
        data.fweight = 0;
        obj.dataSource.filteredData = obj.dataSource.data;
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
      this.resultLength = result.length;
    return result;
  }

  nextPage() {
    this.currentPage = this.currentPage+1;
    this.applyFilter(this.valueSearch);
  }

  previousPage() {
    this.currentPage = this.currentPage-1;
    if (this.currentPage<1) this.currentPage = 1;
    this.applyFilter(this.valueSearch);
  }  

  /**Scroll to top of container */
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  onFocus() {
    console.log("focus",event);
  }
}
