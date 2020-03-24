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
import { KiiTableAbstract } from 'src/app/abstracts/kii-table.abstract';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Email } from '../../models/email';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { KiiAdminEmailService } from '../../services/kii-admin-email.service';
import { resolveMx } from 'dns';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { IEmailData } from 'src/app/_features/email-template/services/kii-email-template.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { KiiConfirmDialogComponent } from 'src/app/_features/form/components/kii-confirm-dialog/kii-confirm-dialog.component';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { KiiAdminNotificationService } from '../../services/kii-admin-notification.service';
import { Onpush } from '../../models/onpush';

@Component({
  selector: 'kii-admin-notification',
  templateUrl: './kii-admin-notification.component.html',
  styleUrls: ['./kii-admin-notification.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class KiiAdminNotificationComponent extends KiiTableAbstract implements OnInit {

  setting : Setting;

  /**Contains all current notification templates */
  notifications : Onpush[] = [];

  /**Contains any image response */
  image : string = null;

  /**Contains icons */
  icons: any = {
    add: faPlusSquare,
    key: faKey,
    delete: faTrash,
    search: faSearchengin,
    send: faPaperPlane
  }

  /**Contains current language */
  currentLang:string;

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
    private kiiAdminNotification: KiiAdminNotificationService,
    private KiiAdminSetting: KiiAdminSettingService,
    public articles: KiiMainArticleService,
    private dialog: MatDialog
    ) { 
    super();
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);
    this.addSubscriber(
      this.kiiTrans.onChange.subscribe(res => {
        this.currentLang = res;
      })
    )

    this.displayedColumns = ['id', 'name', 'description','createdAt', 'updatedAt'];
    this.loadNotifications();
    //Subscribe to notifications changes and refresh table
    this.addSubscriber(
      this.kiiAdminNotification.onChange.subscribe(emails => {
          this.notifications = this.kiiAdminNotification.value();
          this.initTable(this.notifications);
          this.tableSettings();
          this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    );
  }

  /**Loads all available notifications templates */
  loadNotifications() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminNotification.load().subscribe(res => {
        this.notifications = res;
        this.kiiAdminNotification.set(this.notifications);
        this.isDataLoading = false;
      },() => this.isDataLoading =false)
    )
  }


  /**Defines all filtering and sorting table settings */
  tableSettings() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.description.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
    };
    //Define the sorting if special
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case 'id': return item.id;
         case 'name': return item.name;
         case 'description': return item.description;
         default: return item[property];
      }
    };
  }

  /**Creates a new notification template */
  onCreate(value:any) {
    console.log(value);
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminNotification.create(value).subscribe(res => {
          this.kiiAdminNotification.addUnshift(res);
          this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }

  /**Deletes a template */
  onDelete(element:Onpush) {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: "admin-theme",
      data: {text: "admin.notification.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.isDataLoading = true;
        console.log("Deleting",element);

        this.addSubscriber(
          this.kiiAdminNotification.delete(element).subscribe(res => {
            this.kiiAdminNotification.splice(element);
            this.isDataLoading = false;
          }, () => this.isDataLoading = false)
        )
      }
    });
  }

  /**Saves template modifications */
  onUpdate(element:Onpush,event:any) {
    console.log("Saving",element,event);
    element.title = event.title;
    element.body = event.body;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminNotification.update(element).subscribe(res => {
        console.log(res);
        this.isDataLoading = false;
      },()=>this.isDataLoading = false)
    )
  }

  onNotificationSend(notification:Onpush, options:string) {
    console.log("Notification",notification);
    console.log("Options:",options);
    //console.log("Sending email",JSON.parse(email.data));
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminNotification.send(notification,options).subscribe(res => {
        console.log("NOTIFICATION:",res);
        this.isDataLoading = false;
      },()=> {this.isDataLoading = false})
    )
  }


}
