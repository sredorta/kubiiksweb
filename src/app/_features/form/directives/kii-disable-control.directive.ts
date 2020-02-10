import { NgControl } from '@angular/forms';
import { Directive, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[kiiDisableControl]'
})
export class KiiDisableControlDirective {

  @Input('kiiDisableControl') value: boolean = true;
  constructor( private ngControl : NgControl ) {}

  //If input changes later we update the default
  ngOnChanges(changes : SimpleChanges) {
        this.value = changes.value.currentValue;
        this._disableControl(this.value);
  }

  _disableControl(condition:boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }
}