import { Directive, HostListener, ElementRef, Output, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[kiiAppear]'
})
export class KiiAppearDirective {

    private _intersectionObserver? : IntersectionObserver;

    constructor(private _el: ElementRef, private _r : Renderer2,@Inject(PLATFORM_ID) private platform: any) { }

    public ngAfterViewInit () {
        if (isPlatformBrowser(this.platform)) {
            this._intersectionObserver = new IntersectionObserver(entries => {
                this.checkForIntersection(entries);
            }, {});
            this._intersectionObserver.observe(<Element>(this._el.nativeElement));
        }
    }

    private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this._r.addClass(this._el.nativeElement,'kii-appear');
                this._intersectionObserver.unobserve(<Element>(this._el.nativeElement));
                this._intersectionObserver.disconnect();
            }
        });
    }
    
    private checkIfIntersecting (entry: IntersectionObserverEntry) {
        return (<any>entry).isIntersecting && entry.target === this._el.nativeElement;
    }
}
