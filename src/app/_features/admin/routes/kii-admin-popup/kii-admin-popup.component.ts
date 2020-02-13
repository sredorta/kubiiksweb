import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { Setting } from 'src/app/_features/main/models/setting';

@Component({
  selector: 'app-kii-admin-popup',
  templateUrl: './kii-admin-popup.component.html',
  styleUrls: ['./kii-admin-popup.component.scss']
})
export class KiiAdminPopupComponent extends KiiBaseAbstract implements OnInit {

  enabled : boolean = false;
  setting : Setting;
  isLoading:boolean = false;
  @ViewChild(MatSlideToggle, {static:false}) toggle : MatSlideToggle;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiSetting: KiiMainSettingService,
    ) { 
    super();
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);
    this.addSubscriber(
      this.kiiSetting.onChange.subscribe(res => {
        this.setting = this.kiiSetting.getByKey("popup-show");
        console.log(this.setting);
        if (this.setting.value != "disabled") {
          this.enabled = true;
        }
      })
    )
  }

  onStatusChange(value: MatSlideToggleChange) {
/*    if (value.checked == true) {
      this.setting.value = Math.random().toString(36).replace(/[^a-z]+/g, '');
    } else {
      this.setting.value = "disabled";
    }

    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiSetting.updateDialog(this.setting).subscribe(res => {
        this.isLoading = false;
      },
      error => {
        value.source.toggle();
        this.isLoading = false;
      },
       () => this.isLoading = false)
    );*/
  }

}
