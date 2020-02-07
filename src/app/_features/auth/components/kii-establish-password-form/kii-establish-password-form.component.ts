import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';

@Component({
  selector: 'kii-establish-password-form',
  templateUrl: './kii-establish-password-form.component.html',
  styleUrls: ['./kii-establish-password-form.component.scss']
})
export class KiiEstablishPasswordFormComponent extends KiiFormAbstract implements OnInit {
  icon  = [];

  constructor() { 
    super(); 
    this.icon['email'] = faEnvelope;
    this.icon['password'] = faKey;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      password: new FormControl('', Validators.compose([
        Validators.required,
        KiiCustomValidators.password
      ])),
      passwordConfirm: new FormControl('', Validators.compose([    //It needs to be called passwordConfirm so that validator works
        KiiCustomValidators.checkPasswordsMatch
      ])),
    });
  }

}
