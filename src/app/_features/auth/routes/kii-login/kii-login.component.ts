import { Component, OnInit } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'app-kii-login',
  templateUrl: './kii-login.component.html',
  styleUrls: ['./kii-login.component.scss']
})
export class KiiLoginComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService) {
   }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);
  }

  onSubmit(value:any) {
    console.log("OnSubmit !",value);
  }

}
