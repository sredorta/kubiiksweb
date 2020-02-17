import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { Setting } from 'src/app/_features/main/models/setting';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';

@Component({
  selector: 'kii-admin-settings',
  templateUrl: './kii-admin-settings.component.html',
  styleUrls: ['./kii-admin-settings.component.scss']
})
export class KiiAdminSettingsComponent extends KiiBaseAbstract implements OnInit {

  isLoading:boolean = false;
  settings = {};
  @ViewChild(MatSlideToggle, {static:false}) toggle : MatSlideToggle;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiMainSetting: KiiMainSettingService,
    private KiiAdminSetting: KiiAdminSettingService
    ) { 
    super();
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);
    this.addSubscriber(
      this.kiiMainSetting.onChange.subscribe(res => {
        console.log("SETTINGS !!!");
        for (let setting of this.kiiMainSetting.getValue()) {
          this.settings[setting.key] = setting;
        }
        console.log(this.settings);
      })
    )
  }


}
