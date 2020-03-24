import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';

@Component({
  selector: 'kii-new-form',
  templateUrl: './kii-new-form.component.html',
  styleUrls: ['./kii-new-form.component.scss']
})
export class KiiNewFormComponent extends KiiFormAbstract implements OnInit {

  constructor() { super() }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({    
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ])),
    });
  }
}
