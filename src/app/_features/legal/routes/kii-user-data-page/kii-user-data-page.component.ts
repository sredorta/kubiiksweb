import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'app-kii-user-data-page',
  templateUrl: './kii-user-data-page.component.html',
  styleUrls: ['./kii-user-data-page.component.scss']
})
export class KiiUserDataPageComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService, private location : Location) { }

  ngOnInit() {
    //We require main + legal here
    this.kiiTrans.setRequiredContext(['legal']);
  }

  goBack() {
    this.location.back();
  }
}
