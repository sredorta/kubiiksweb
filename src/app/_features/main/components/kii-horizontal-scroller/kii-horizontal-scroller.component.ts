import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';




@Component({
  selector: 'kii-horizontal-scroller',
  templateUrl: './kii-horizontal-scroller.component.html',
  styleUrls: ['./kii-horizontal-scroller.component.scss']
})
export class KiiHorizontalScrollerComponent implements OnInit {

  /**Defines the scroll delta */
  @Input() scrollDelta : number =300;

  /**Scroll position */
  private _scrollValue : number = 0;

  /**Max scroll position */
  private _scrollMax : number = 10000;

  icons : any = {
    left: faChevronLeft,
    right: faChevronRight
  }

  @ViewChild('content', {static:false}) content : ElementRef;

  @HostListener('window:resize', ['$event'])
  onresize(event?) {
    if (this.content) {
      this._scrollMax = this.content.nativeElement.scrollWidth - window.innerWidth+40;
    }
  }

  @HostListener('touchmove')
  onmouseover(event?) {
    console.log("MOVED !!!");
  }

  constructor(@Inject(PLATFORM_ID) private platform: any) { 
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  scrollRight() {
    if (isPlatformBrowser(this.platform))
      if (this.content) {
        this.onresize();
        this._scrollValue = this._scrollValue+this.scrollDelta;
        if (this._scrollValue>this._scrollMax) this._scrollValue = this._scrollMax;
        this.content.nativeElement.scrollLeft= this._scrollValue;
      }
  }

  scrollLeft() {
    if (isPlatformBrowser(this.platform))
      if (this.content) {
        this.onresize();
        this._scrollValue = this._scrollValue-this.scrollDelta;
        if (this._scrollValue<0) this._scrollValue = 0;
        this.content.nativeElement.scrollLeft= this._scrollValue;
      }
  }

}
