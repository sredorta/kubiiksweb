import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

@Component({
  selector: 'kii-reset-password-form',
  templateUrl: './kii-reset-password-form.component.html',
  styleUrls: ['./kii-reset-password-form.component.scss']
})
export class KiiResetPasswordFormComponent extends KiiFormAbstract implements OnInit {
  icon  = [];

  constructor() { 
    super(); 
    this.icon['email'] = faEnvelope;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ])),
    });
  }

}
