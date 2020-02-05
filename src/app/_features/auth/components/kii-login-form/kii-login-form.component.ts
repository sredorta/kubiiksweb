import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';

@Component({
  selector: 'kii-login-form',
  templateUrl: './kii-login-form.component.html',
  styleUrls: ['./kii-login-form.component.scss']
})
export class KiiLoginFormComponent extends KiiFormAbstract implements OnInit {
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
      keepconnected: new FormControl(false,null),
    });
  }
}
