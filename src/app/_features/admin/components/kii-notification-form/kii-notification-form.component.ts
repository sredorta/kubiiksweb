import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { Onpush } from '../../models/onpush';

@Component({
  selector: 'kii-notification-form',
  templateUrl: './kii-notification-form.component.html',
  styleUrls: ['./kii-notification-form.component.scss']
})
export class KiiNotificationFormComponent extends KiiFormAbstract implements OnInit {


  @Input() notification: Onpush = new Onpush(null);

  constructor() { super() }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.notification) {
      this.notification = changes.notification.currentValue;
    }
  }

  createForm() {
    this.myForm =  new FormGroup({    
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])),
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ])),
    });
  }
}
