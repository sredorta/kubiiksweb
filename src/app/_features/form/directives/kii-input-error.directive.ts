import { Directive,Inject,Input, PLATFORM_ID,ElementRef,Renderer2, OnDestroy} from '@angular/core';
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Observable, Subscription,merge, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';

@Directive({
  selector: '[kiiInputError]'
})
export class KiiInputErrorDirective  implements OnDestroy{
  @Input('kiiInputError') controlName: string = "";
  control : AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  span : any;  //Span element of the error message

  constructor(
      private _element: ElementRef,
      private _renderer: Renderer2,
      private _fg : ControlContainer,
      private _trans : KiiTranslateService,
    @Inject(PLATFORM_ID) private _platformId) { }

  /**Get current form where directive is applied */  
  get form(){ return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

  ngOnInit() {
    this.control = this.form.get(this.controlName);
    if (!this.control) {
      console.error("mat-error: Invalid form control provided in HTML");
    }
    let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.pipe(map(res => this.hasSubmitted = true));
    this.controlValue$ =  merge(this.control.valueChanges, of(''), formSubmit$ );
    this.controlSubscription = this.controlValue$.subscribe((submit:boolean) => {
      //Reset password confirm if there is a change on password
      if (this.controlName == "password") {
        if (submit != true)
          if (this.form.get("passwordConfirm"))
            this.form.get("passwordConfirm").setValue("");
      }
      this.setError();
    });
  }


  //Shows or hides error depending on conditions
  private setError() {
    if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
          this.getMessage(this.control.errors);
    } else {
      this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
    }
  }  

  //Gets the translated message and calls addSpan
  private getMessage(error : any) {
    let myError : string;
    if (error.required) 
      myError = "f.err.required";
    else if(error.minlength)
      myError = "f.err.minlength";
    else if(error.maxlength)
      myError = "f.err.maxlength";
    else if(error.min) 
      myError = "f.err.min";
    else if(error.max) 
      myError = "f.err.max";
    else if(error.email) 
      myError = "f.err.email";
    //Send first attribute as this is most probably a custom attribute
    if (!myError) {
      myError = "f.err." + Object.keys(error)[0];
    }  
    this.addSpan(this._trans.translations[this._trans.getCurrent()][myError]?this._trans.translations[this._trans.getCurrent()][myError]:myError);
  }

  //Adds a span element on the mat-error component with the message provided
  private addSpan(message:string) {
    //Remove previous span if any

    if (this.span) {
      this._renderer.removeChild(this._element, this.span);
    }
    //Add span with correct error message
    this.span = this._renderer.createElement('span');
    const text = this._renderer.createText(message);
    this._renderer.appendChild(this.span,text);
    this._renderer.appendChild(this._element.nativeElement, this.span);
    //Show the error  
    this._renderer.removeStyle(this._element.nativeElement, 'display');
    
  }


  //Unsubscribe
  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }
}
