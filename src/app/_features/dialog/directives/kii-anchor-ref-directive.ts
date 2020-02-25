import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kiiAnchorRef]',
})
export class KiiAnchorRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}