import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faMobile } from '@fortawesome/free-solid-svg-icons/faMobile';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';

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

  /**Contains the configuration of the image upload element */
  config : IConfigImageUpload;

  constructor(
            private trans: KiiTranslateService, 
            private kiiAuth: KiiMainUserService) {
              super(); 
              this.icon['name'] = faUserTag;
              this.icon['email'] = faEnvelope;
              this.icon['password'] = faKey;
              this.icon['phone'] = faPhone;
              this.icon['mobile'] = faMobile;
              this.icon['lang'] = faGlobeEurope;
              this.icon['edit'] = faEdit;
              this.icon['save'] = faSave;
              this.config = {
                label:'a.avatar.l', 
                hint:'a.avatar.h',
                storage:DiskType.AVATAR,
                maxWidth:'200px',
                defaultImage: './assets/kiilib/images/profile.svg'}
            }

  ngOnInit() {
    this.createForm();
    this.addSubscriber(this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.defaults = res;
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
          //Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])), 
        mobile: new FormControl('', Validators.compose([
          //Validators.required,
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
        passwordOld: new FormControl('', Validators.compose([
          Validators.required,
          KiiCustomValidators.password
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          KiiCustomValidators.password
        ])),
        passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
          KiiCustomValidators.checkPasswordsMatch
        ])),
        avatar: new FormControl('', Validators.compose([])),

      });
  }


  /**Toggle password visibility */
  togglePassword() {
    this.modifyPassword = !this.modifyPassword;
  }

  /**Resets the form */
  reset() {
    this.myForm.controls['passwordOld'].patchValue("");
    this.myForm.controls['password'].patchValue("");
    this.myForm.controls['passwordConfirm'].patchValue("");
    this.myForm.markAsPristine();
    this.modifyPassword = false;
  }

  /**Send only the modified values */
  onSubmit(value:any) {
    this.kiiOnSubmit.emit(value);
  }

}
