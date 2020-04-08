import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { Setting } from 'src/app/_features/main/models/setting';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { environment } from 'src/environments/environment';
import { KiiAdminPageService } from '../../services/kii-admin-page.service';
import { Page } from 'src/app/_features/main/models/page';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';

@Component({
  selector: 'kii-admin-settings',
  templateUrl: './kii-admin-settings.component.html',
  styleUrls: ['./kii-admin-settings.component.scss']
})
export class KiiAdminSettingsComponent extends KiiBaseAbstract implements OnInit {

  isLoading:boolean = false;
  settings = {};
  @ViewChild(MatSlideToggle, {static:false}) toggle : MatSlideToggle;

  configFavicon : IConfigImageUpload = {
    label:"",
    hint:"",
    buttonsPosition:  'right',
    crop:true,
    maxSize:32,
    fileName:"favicon.png",    //When specified we do not regenerate a date name and keep this name
    storage: DiskType.DEFAULT,
    imageFormat: "image/x-png",
    maxWidth: "150px"    //Max width of the image element
  }
  configIcon192 : IConfigImageUpload = {
    label:"",
    hint:"",
    buttonsPosition:  'right',
    crop:true,
    maxSize:192,
    fileName:"icon-192x192.png",    //When specified we do not regenerate a date name and keep this name
    storage: DiskType.DEFAULT,
    imageFormat: "image/x-png",
    maxWidth: "150px"    //Max width of the image element
  }
  configIcon512 : IConfigImageUpload = {
    label:"",
    hint:"",
    buttonsPosition:  'right',
    crop:true,
    maxSize:512,
    fileName:"icon-512x512.png",    //When specified we do not regenerate a date name and keep this name
    storage: DiskType.DEFAULT,
    imageFormat: "image/x-png",
    maxWidth: "150px"    //Max width of the image element
  }
  configLogo : IConfigImageUpload = {
    label:"",
    hint:"",
    buttonsPosition:  'right',
    crop:true,
    maxSize:300,
    fileName:"logo.jpg",    //When specified we do not regenerate a date name and keep this name
    storage: DiskType.DEFAULT,
    imageFormat: "image/jpeg",
    maxWidth: "150px"    //Max width of the image element
  }

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiMainSetting: KiiMainSettingService,
    private kiiPage: KiiAdminPageService,
    private kiiMainPage: KiiMainPageService
    ) { 
    super();
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);
    this.addSubscriber(
      this.kiiMainSetting.onChange.subscribe(res => {
        for (let setting of this.kiiMainSetting.getValue()) {
          this.settings[setting.key] = setting;
        }
      })
    )
  }

  getImage(key:string) {
    let mySetting = this.kiiMainSetting.getByKey(key);
    return mySetting.value;
  }

    /**Saves SEO settings */
    saveSeo(result:any) {
      console.log("SAVING:",result);
      this.addSubscriber(
        this.kiiPage.update(new Page(result)).subscribe(res => {
          this.kiiMainPage.refresh(res);
        })
      )
    }

}
