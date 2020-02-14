import { Component, OnInit } from '@angular/core';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

@Component({
  selector: 'kii-setting-item',
  templateUrl: './kii-setting-item.component.html',
  styleUrls: ['./kii-setting-item.component.scss']
})
export class KiiSettingItemComponent extends KiiFormAbstract implements OnInit {

  label:string = "myLabel";
  placeholder:string ="myPlaceholder";
  hint:string = "myHint";
  value:string="hello";
  icons = [];

  constructor() { 
    super();
    this.icons['save'] = faSave;
  }

  ngOnInit(): void {
    this.myForm =  new FormGroup({
      result: new FormControl('', Validators.compose([]))
    });
  }

}
