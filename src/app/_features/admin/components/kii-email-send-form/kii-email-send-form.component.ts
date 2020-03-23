import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

@Component({
  selector: 'kii-email-send-form',
  templateUrl: './kii-email-send-form.component.html',
  styleUrls: ['./kii-email-send-form.component.scss']
})
export class KiiEmailSendFormComponent extends KiiFormAbstract implements OnInit {
  icons  = {
    send: faPaperPlane
  };

  /**If submit button is disabled */
  disabled : boolean = false;

  constructor() { 
    super(); 
  }

  ngOnInit() {
    this.createForm();
    this.addSubscriber(
      this.myForm.statusChanges.subscribe(res => {
        this.disabled = true;
        Object.keys(this.myForm.controls).forEach(key=> {
          if (this.myForm.controls[key].value == true) this.disabled = false;
        })
      })
    )
  }

  createForm() {
    this.myForm =  new FormGroup({    
      self: new FormControl(true,null),
      users: new FormControl(false,null),
      newsletters: new FormControl(false,null),
    });
  }

}
