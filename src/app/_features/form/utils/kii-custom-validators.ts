import { FormControl, FormGroup, NgForm, FormGroupDirective } from '@angular/forms';

export class KiiCustomValidators {
    constructor() { }

  /**Validates password quality */
  static password(fc: FormControl) {
    if (fc.value == null) {
        return(null)
    }
    if (KiiCustomValidators.scorePassword(fc.value) < 60) {
        return({password : true})
    } else {
        return(null);
    }
    if (fc.value.length < 5 ) 
      return({minlength : true});
    var re = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}';
    if (fc.value.match(re)) {
        return (null);
    } else {
        return({password : true})
    }
  }    

  /**Calculates the password score */
  static scorePassword(pass:string) :number {
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



  /**Validates that password and passwordConfirm are matching */
  static checkPasswordsMatch(fc:FormControl | any) {
    if (fc.parent) {
        if (fc.parent.controls) {
            let fc1 = fc.parent.controls.password;
            let fc2 = fc.parent.controls.passwordConfirm;
            if (fc1.value != fc2.value) {
                return({checkPasswordsMatch: true});
            }
        }
    }
    return null;
  }
 /**Validates it's a boolean */
 static boolean(fc: FormControl) {
    if (fc.value == null) {
        return {boolean:true};
    }
    if (fc.value == true || fc.value == false)
        return null;
    return {boolean:true};
  }    

 /**Validates it's a boolean and true */
 static isBooleanTrue(fc: FormControl) {
    if (fc.value == null) {
        return {boolean:true};
    }
    if (fc.value == true)
        return null;
    return {boolean:true};
  }  

}
