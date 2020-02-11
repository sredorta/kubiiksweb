import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})
export class KiiAdminStatsComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService, private location : Location) { }

  ngOnInit() {
    //We require main + legal here
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);

  }

  goBack() {
    this.location.back();
  }
}
