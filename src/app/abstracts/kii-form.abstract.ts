import {Output, EventEmitter, Input, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import { KiiBaseAbstract } from './kii-base.abstract';
import {FormGroup} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material';

export  class KiiFormAbstract extends KiiBaseAbstract implements OnChanges {
    public myForm : FormGroup;
    protected isForm : boolean = true;


    /**Appearance for the mat-form-field */
    kiiInputAppearance : MatFormFieldAppearance | string = 'fill';
  

    @Input() isFormLoading : boolean = false;
    @Output() kiiOnSubmit = new EventEmitter<any>();

    public ngOnChanges(changes: SimpleChanges) {
      if (changes.isFormLoading) {
        this.isFormLoading = changes.isFormLoading.currentValue;
      }
    }

    //Sets a value for a control
    protected setValue(controlName: string, value:any) {
      this.myForm.controls[controlName].setValue(value);
    }

    //Gets the value of a control
    protected getValue(controlName:string) {
      return this.myForm.controls[controlName].value;
    }


    protected resetForm() {
        this.myForm.reset();
    }

    onSubmit(value:any) {
      if (this.myForm.valid) {
        this.kiiOnSubmit.emit(value);
      } 
    }

}