import { Directive, Input, Self, HostBinding, HostListener, OnChanges, SimpleChanges, SimpleChange, ElementRef, Output, EventEmitter, Renderer2, ContentChild, ContentChildren, ViewChildren, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective,  NgControl } from '@angular/forms';
import { MatHint } from '@angular/material';


@Directive({
  selector: '[kiiPasswordStrength]'
})
export class KiiPasswordStrengthDirective {

  div : any;

   //Listen to keyup events and do the checking to update the value
   @HostListener('keyup', ['$event'])
   onKeyDown(e: KeyboardEvent) {
      this.checkStrength();
   }
  @HostListener('change') ngOnChanges() {
      this.checkStrength();
  }
  constructor(private _el: ElementRef, private r:Renderer2) { 
    console.log(this._el);
  }

  ngOnInit() {
    console.log("kiiPasswordStrength Directive STARTED !!!")
  }
  ngAfterViewInit() {
    this.r.setStyle(this._el.nativeElement, 'position','relative');
    //.log("INPUT IS", this.input);
    this.div = this.r.createElement('div');
    this.r.setStyle(this.div,'width','0%');
    this.r.setStyle(this.div,'height','6px');
    this.r.setStyle(this.div, 'background','red');//"linear-gradient(to-right, #FF0000 0%, #00FF00 100%)");
    this.r.setStyle(this.div, 'position','absolute');
    this.r.setStyle(this.div, 'bottom','0px');

    this.r.parentNode(this._el.nativeElement).appendChild(this.div);

  }

  checkStrength() {
    if (this.div) {
      const strength = this.scorePassword(this._el.nativeElement.value) ;
      this.r.setStyle(this.div,'width', strength+'%');
      if (strength<60) {
        this.r.setStyle(this.div, 'background','red');
      } else if (strength<80) {
        this.r.setStyle(this.div, 'background','orange');
      } else {
        this.r.setStyle(this.div, 'background','green');
      }

    }
  }

  /**Calculates the password score */
  scorePassword(pass:string) :number {
    let score :number = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    score= score>100?100:score;
    return Math.floor(score);
  }

}
