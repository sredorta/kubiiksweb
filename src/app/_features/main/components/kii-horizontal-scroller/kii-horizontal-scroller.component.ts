import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, Inject, PLATFORM_ID, ContentChildren, QueryList, ComponentRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { KiiElementComponent } from '../kii-element/kii-element.component';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';




@Component({
  selector: 'kii-horizontal-scroller',
  templateUrl: './kii-horizontal-scroller.component.html',
  styleUrls: ['./kii-horizontal-scroller.component.scss']
})
export class KiiHorizontalScrollerComponent extends KiiBaseAbstract implements OnInit {

  /**Defines the scroll delta */
  @Input() scrollDelta : number =300;

  /**Scroll position */
  private _scrollValue : number = 0;

  /**Max scroll position */
  public scrollMax : number = 0;

  icons : any = {
    left: faChevronLeft,
    right: faChevronRight
  }

  @ViewChild('content', {static:false}) content : ElementRef;
  @ContentChildren(KiiElementComponent) itemList:QueryList<KiiElementComponent>;

  @HostListener('window:resize', ['$event'])
  onresize(event?) {
    if (this.content) {
      this.scrollMax = this.content.nativeElement.scrollWidth - window.innerWidth;
    }
  }


  constructor(@Inject(PLATFORM_ID) private platform: any) { 
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //If there are changes in the items list then recalculate
    if (this.itemList)
    if (isPlatformBrowser(this.platform)) {
      setTimeout(()=> {
        this.onresize();
      });
      this.addSubscriber(
          this.itemList.changes.subscribe(()=> {
              setTimeout(()=> {
                this.onresize();
              });
          })
      );
    }

  }


  scrollRight() {
    if (isPlatformBrowser(this.platform))
      if (this.content) {
        this.onresize();
        this._scrollValue = this._scrollValue+this.scrollDelta;
        if (this._scrollValue>this.scrollMax) this._scrollValue = this.scrollMax;
        this.content.nativeElement.scrollLeft= this._scrollValue;
      }
  }

  scrollLeft() {
    if (isPlatformBrowser(this.platform))
      if (this.content) {
        this.onresize();
        this._scrollValue = this._scrollValue-this.scrollDelta;
        if (this._scrollValue<0) this._scrollValue = 0;
        console.log(this._scrollValue);
        this.content.nativeElement.scrollLeft= this._scrollValue;
      }
  }

}
