import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { KiiAdminUserService } from '../../services/kii-admin-user.service';

@Component({
  selector: 'kii-notification-send-form',
  templateUrl: './kii-notification-send-form.component.html',
  styleUrls: ['./kii-notification-send-form.component.scss']
})
export class KiiNotificationSendFormComponent implements OnInit {
  icons  = {
    send: faPaperPlane
  };

  destination : string = 'all';
  @Output() kiiOnSubmit = new EventEmitter<any>(); 

  constructor(private kiiAdminUser : KiiAdminUserService) { 
  }

  ngOnInit() {

  }

  send() {
    this.kiiOnSubmit.emit(this.destination);
  }


}
