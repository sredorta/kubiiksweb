import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kiiAnchorDialogRef]',
})
export class KiiAnchorDialogRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}