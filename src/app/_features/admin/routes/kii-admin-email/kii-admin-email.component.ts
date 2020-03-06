import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';
import { Setting } from '../../../main/models/setting';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { EmailEditorComponent } from 'angular-email-editor';

@Component({
  selector: 'kii-admin-email',
  templateUrl: './kii-admin-email.component.html',
  styleUrls: ['./kii-admin-email.component.scss']
})
export class KiiAdminEmailComponent extends KiiBaseAbstract implements OnInit {

  setting : Setting;
  isLoading:boolean = false;

  previewHtml:string = "";
  @ViewChild(EmailEditorComponent) private emailEditor: EmailEditorComponent;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiMainSetting: KiiMainSettingService,
    private KiiAdminSetting: KiiAdminSettingService,
    public articles: KiiMainArticleService
    ) { 
    super();
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);
    this.addSubscriber(
      this.kiiMainSetting.onChange.subscribe(res => {
        console.log(res);
      })
    )
  }

  //REMOVE ME !!!!!!!!!!!!!!!!
  testEmail() {
    console.log("Sending email test !");
  }

  /**Updates preview when changes on email editor */
  updatePreview(html:string) {
    console.log("Updating preview",html);
    this.previewHtml=html;
  }

 
  exportHtml() {
    this.emailEditor.exportHtml((data) => console.log('exportHtml', data));
  }

}
