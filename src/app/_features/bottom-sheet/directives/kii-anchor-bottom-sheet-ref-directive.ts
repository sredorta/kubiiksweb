import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kiiAnchorBottomSheetRef]',
})
export class KiiAnchorBottomSheetRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}