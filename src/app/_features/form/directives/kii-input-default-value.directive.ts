import { Directive, Input, Self, HostBinding, HostListener, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ControlContainer, FormGroupDirective,  NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[kiiInputDefaultValue]'
})
export class KiiInputDefaultValueDirective {
  @Input('kiiInputDefaultValue') value: string = "";
  controlName : string = "";
  isDefaultSet : boolean = false;
  subscription : Subscription;

   //Add the class kii-input-default if the value is matching the default
   @HostBinding('class.kii-input-default')
   get hasDefault() {
     return this.isDefaultSet;
   }
 
  //TODO: 
  //Issue happens on HostListener of DefaultValue directive
  //https://github.com/angular/universal/issues/844

   //Listen to reset of form and set default if reseted
   @HostListener('ngModelChange', ['$event']) 
   onModelChange(value: any) {
     if(event)
     if (!value && event.type == "reset") {
       setTimeout(()=>this._setDefaultValue());
     }
   }

 
  constructor(private ngControl: NgControl,private _fg: ControlContainer) { }

  get form(){ return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

  ngOnInit() {
    if (this.ngControl) {
      this._setDefaultValue();
      this.subscription = this.form.controls[this.ngControl.name].valueChanges.subscribe(res => {
        if (this.value != "") {
          if (this.ngControl.value != this.value) this.isDefaultSet = false;
          else this.isDefaultSet = true;
        }
      });
    }
  }

  //If input changes later we update the default
  ngOnChanges(changes : SimpleChanges) {
    this.value = changes.value.currentValue;
    this._setDefaultValue();
  }

  //Sets the default value and variable for class binding
  private _setDefaultValue() {
    if (this.value != "") {
      this.form.controls[this.ngControl.name].setValue(this.value,{emitEvent:false});
      this.isDefaultSet = true;
    }
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
