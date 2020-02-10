import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faMobile } from '@fortawesome/free-solid-svg-icons/faMobile';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'kii-profile-form',
  templateUrl: './kii-profile-form.component.html',
  styleUrls: ['./kii-profile-form.component.scss']
})
export class KiiProfileFormComponent extends KiiFormAbstract implements OnInit {
  /**Contains icons */
  icon  = [];


  /**Defines storage */
  //TODO: create enum for storage and add avatars storage
  storage : string = 'content';

  /**Input user set for defaults */
  @Input() defaults : User = new User(null);  //Default values if any

  /**Variable that toggles the password modification visibility */
  modifyPassword : boolean = false;

  /**Contains the tooltip of the password info */
  passwordInfo : string = "";

  /**Contains all languages */
  languages : any = this.trans.getSupportedLanguages();

  constructor(
            private trans: KiiTranslateService, 
            private kiiAuth: KiiAuthService) {
              super(); 
              this.icon['name'] = faUserTag;
              this.icon['email'] = faEnvelope;
              this.icon['password'] = faKey;
              this.icon['phone'] = faPhone;
              this.icon['mobile'] = faMobile;
              this.icon['lang'] = faGlobeEurope;
              this.icon['edit'] = faEdit;
            }

  ngOnInit() {
    this.createForm();
    this.addSubscriber(this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.defaults = res;
        console.log("DEFAULTS",res);
    }))
  }


  /**Creates the form with all dependencies of shared */
  createForm() {
      this.myForm =  new FormGroup({
        firstName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),
        lastName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),       
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])), 
        mobile: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ])),
        language: new FormControl('', Validators.compose([
          Validators.required,
        ])),
/*        avatar: new FormControl('', Validators.compose([])),
        passwordOld: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          KiiCustomValidators.password
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          KiiCustomValidators.password
        ])),
        passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
          KiiCustomValidators.checkPasswordsMatch
        ])),*/
      });
//      this.myForm.controls["avatar"].patchValue(this.defaults.avatar);
//      this.disableControls();
  }

  /**Patch the value of image once we recieve onUpload */
  onUpload(url:string) {
    this.myForm.controls["avatar"].setValue(url);
    this.myForm.controls["avatar"].enable();
    this.myForm.markAsDirty();
  }

  /**Disables all controls */
  public disableControls() {
    Object.keys(this.myForm.controls).forEach(key => {
      this.myForm.get(key).disable();
    });
  }

  /**Returns if controls is enabled or disabled */
  isEnabled(control:string) {
    return this.myForm.controls[control].enabled;
  }
  /**Closes and resets password area */
  public resetPasswords() {
    Object.keys(this.myForm.controls).forEach(key => {
      if (key.search("password")>=0)
        this.myForm.get(key).reset();
        this.myForm.get(key).markAsPristine();
        this.myForm.get(key).markAsUntouched();
    })
    if (this.modifyPassword)
      this.togglePassword();
  }

  /**toggles enabled/disabled of control */
  toggleControl(control:string)  {
    if (this.myForm.controls[control].disabled) {
      this.myForm.controls[control].enable();
    } else {
      //Only allow redisable if value has not changed !
      if (this.myForm.controls[control].value != this.defaults[control]) {
        this.myForm.controls[control].patchValue(this.defaults[control]);
      }
      this.myForm.controls[control].disable();
    }
  }

  /**Toggle password visibility */
  togglePassword() {
    this.modifyPassword = !this.modifyPassword;
    if (this.modifyPassword == true)
      Object.keys(this.myForm.controls).forEach(key => {
        if (key.search("password")>=0)
          this.myForm.get(key).enable();
      })
    else
      Object.keys(this.myForm.controls).forEach(key => {
        if (key.search("password")>=0)
          this.myForm.get(key).disable();
      })   
  }    

}
