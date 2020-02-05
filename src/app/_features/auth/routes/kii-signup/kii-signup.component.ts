import { Component, OnInit } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'app-kii-signup',
  templateUrl: './kii-signup.component.html',
  styleUrls: ['./kii-signup.component.scss']
})
export class KiiSignupComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService) {  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth']);

  }

}
