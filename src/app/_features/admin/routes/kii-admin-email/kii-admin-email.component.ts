import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange, MatDialog } from '@angular/material';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';
import { Setting } from '../../../main/models/setting';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { EmailEditorComponent } from 'angular-email-editor';
import { KiiImageGalleryDialogComponent } from '../../components/kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'kii-admin-email',
  templateUrl: './kii-admin-email.component.html',
  styleUrls: ['./kii-admin-email.component.scss']
})
export class KiiAdminEmailComponent extends KiiBaseAbstract implements OnInit {

  setting : Setting;
  isLoading:boolean = false;

  /**Contains any image response */
  image : string = null;

  uploadConfig : IConfigImageUpload = {
    label:'admin.summary.image.t', 
    hint:'admin.summary.image.s',
    buttonsPosition:'right',
    storage: DiskType.EMAIL,
    maxWidth:'120px',
    maxSize:600,
    crop:false,
    defaultImage: './assets/kiilib/images/no-photo.svg'
  }

  previewHtml:string = "";
  @ViewChild(EmailEditorComponent) private emailEditor: EmailEditorComponent;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiMainSetting: KiiMainSettingService,
    private KiiAdminSetting: KiiAdminSettingService,
    public articles: KiiMainArticleService,
    private dialog: MatDialog
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

  /**Opens the dialog of the image gallery when asked */
  onRequestImage() {
      console.log("OPENNING GALLERY DIALOG !!!");
      let dialogRef = this.dialog.open(KiiImageGalleryDialogComponent, {
        data: {configUpload:this.uploadConfig},
        scrollStrategy: new NoopScrollStrategy(),
        minWidth:"320px",
        panelClass:"admin-theme"
      });
      this.addSubscriber(
        dialogRef.afterClosed().subscribe(result => {
          this.image = result;
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
