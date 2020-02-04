import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'kii-cookies-page',
  templateUrl: './kii-cookies-page.component.html',
  styleUrls: ['./kii-cookies-page.component.scss']
})
export class KiiCookiesPageComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService, private location : Location) { }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['legal']);
  }


  goBack() {
    this.location.back();
  }
}
