import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { KiiMainContactService } from '../../services/kii-main-contact.service';
import { KiiMainNetworkService } from 'src/app/_features/main/services/kii-main-network.service';

@Component({
  selector: 'kii-contact-form',
  templateUrl: './kii-contact-form.component.html',
  styleUrls: ['./kii-contact-form.component.scss']
})
export class KiiContactFormComponent extends KiiFormAbstract implements OnInit {
  @ViewChild('form', {static:false}) form;

  icons:any = {
    email:faAt,
    send: faPaperPlane
  }
  offline:boolean = false;

  constructor(private kiiContact : KiiMainContactService,private network: KiiMainNetworkService) { super() }

  ngOnInit() {
    this.createForm();
    this.addSubscriber(
      this.network.offline.subscribe(res => {
        this.offline = res;
      })
    )
  }
  createForm() {
    this.myForm =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      subject: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      message: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
    });
  }
  //Do send the message
  onSubmit(value:any) {
    if (this.myForm.valid) {
      this.isFormLoading = true;
      this.addSubscriber(
        this.kiiContact.contact(value).subscribe(res => {
          this.isFormLoading = false;
          this.form.resetForm();
        }, () => this.isFormLoading = false)
      )
    } 
  }
}
