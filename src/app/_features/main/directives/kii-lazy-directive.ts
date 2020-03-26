import { Directive, HostListener, ElementRef, Output, Renderer2, PLATFORM_ID, Inject, SimpleChanges, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

interface IElement {
    id: number;
    nativeElement: any;
}


@Directive({
  selector: '[kiiLazy]'
})
export class KiiLazyDirective {

    private _intersectionObserver : IntersectionObserver[] = [];
    private _elements : IElement[] = [];
    private _subscr : Subscription;
    @Input('kiiLazy') onChange : BehaviorSubject<boolean>;



    constructor(private _el: ElementRef, private _r : Renderer2,@Inject(PLATFORM_ID) private platform: any) { }

    public ngAfterViewInit () {    
        if (isPlatformBrowser(this.platform)) {
            if (this.onChange) {
                this._subscr = this.onChange.subscribe(res => {
                    //Unsubscribe to all previous observables
                    this.release();
                    setTimeout(()=> {
                        this.init(this._el.nativeElement);
                    });
                });
            } else
                this.init(this._el.nativeElement);
        }
    }

    /**Initializes the array of elements by finding hierarchically all elements that have data-src attribute */
    private init(master:Element) {
          let elements : any[] = [];
          function _getElements(element:any, elements:any[]) {
              if (element && element.dataset && element.dataset.src)
                    elements.push(element);
              for (let elem of element.children) {
                  _getElements(elem,elements);
              }
          }
          _getElements(master,elements);
          let id = 0;
          for(let elem of elements) {
            this._elements.push({nativeElement:elem,id:id});
            id = id + 1;
          }
          //Now create the observer
          let obj = this;
          for (let item of this._elements) {
            this._intersectionObserver[item.id] = new IntersectionObserver(entries => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    if ((<any>entry).isIntersecting && entry.target === item.nativeElement) {
                        obj.load(item.nativeElement)
                        obj._intersectionObserver[item.id].unobserve(<Element>(item.nativeElement));
                        obj._intersectionObserver[item.id].disconnect();
                    }
                });
            }, {});
            this._intersectionObserver[item.id].observe(item.nativeElement);
          }
    }

    /**Loads data as it has appear */
    private load(elem:any) {
        if (elem.nodeName == "IMG")
            if (elem.src && elem.dataset && elem.dataset.src) {
                elem.src = elem.dataset.src;
            }
        if (elem.nodeName == "DIV") {
            //TODO BACKGROUND IMAGE
        }
    }


    /**Releases data so that we can rerun init */
    release() {
        for (let elem of this._elements) {
            if (this._intersectionObserver[elem.id]) {
                this._intersectionObserver[elem.id].unobserve(elem.nativeElement);
                this._intersectionObserver[elem.id].disconnect();
            }
            this._elements = [];
            this._intersectionObserver = [];
        }
    }

    ngOnDestroy() {
        if (this._subscr) this._subscr.unsubscribe();
    }

}