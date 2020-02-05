import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
import { KiiFormRestoreService } from 'src/app/_features/main/services/kii-form-restore.service';
@Component({
  selector: 'kii-signup-form',
  templateUrl: './kii-signup-form.component.html',
  styleUrls: ['./kii-signup-form.component.scss']
})
export class KiiSignupFormComponent extends KiiFormAbstract implements OnInit {
  icon  = [];
  constructor(private kiiForm: KiiFormRestoreService) { 
    super(); 
    this.icon['name'] = faUserTag;
    this.icon['email'] = faEnvelope;
    this.icon['password'] = faKey;
  }

  ngOnInit() {
    this.createForm();
  }

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
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        KiiCustomValidators.password
      ])),
      passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
        KiiCustomValidators.checkPasswordsMatch
      ])),
      newsletter: new FormControl(true, Validators.compose([
        Validators.required
      ])), 
      terms: new FormControl(false, Validators.compose([
        Validators.required,
        KiiCustomValidators.isBooleanTrue
      ])),
    });
    //Restore values if any
    const restore = this.kiiForm.restore('signup');
    if (restore) 
      for (const [control, value] of Object.entries(restore)) 
        if (value != "") 
          this.myForm.controls[control].patchValue(value);
    this.kiiForm.store('signup', {}); //Reset restore    
    

  }

  /**Store form content as we move to legal so that when we are back we restore it */
  storeForm() {
    this.kiiForm.store('signup', this.myForm.value);
  }

  /**When form is submitted */
  onSubmit(value:any) {
    console.log("Submitting:",value);
  }
}
