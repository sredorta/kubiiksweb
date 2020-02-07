import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';

@Component({
  selector: 'kii-admin-menu',
  templateUrl: './kii-admin-menu.component.html',
  styleUrls: ['./kii-admin-menu.component.scss']
})
export class KiiAdminMenuComponent implements OnInit {

  constructor(private kiiTrans: KiiTranslateService, private location : Location) { }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['admin']);
  }


  goBack() {
    this.location.back();
  }
}
