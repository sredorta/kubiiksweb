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

@Component({
  selector: 'kii-admin-email',
  templateUrl: './kii-admin-email.component.html',
  styleUrls: ['./kii-admin-email.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class KiiAdminEmailComponent extends KiiTableAbstract implements OnInit {

  setting : Setting;

  /**Contains all current emails */
  emails : Email[] = [];

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
    private kiiAdminEmail: KiiAdminEmailService,
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
    this.addSubscriber(
      this.kiiMainSetting.onChange.subscribe(res => {
        console.log(res);
      })
    )
    this.displayedColumns = ['id', 'name', 'description','createdAt', 'updatedAt', 'isProtected'];
    this.loadEmails();
    //Subscribe to email changes and refresh table
    this.addSubscriber(
      this.kiiAdminEmail.onChange.subscribe(emails => {
          //Filter out cathegories of templates that are for kubiiks users only
          /*if (!this.loggedInUser.hasRole('kubiiks')) {
              this.emails = emails.filter(obj => obj.isProtected != true);
          }*/
          this.emails = this.kiiAdminEmail.value();
          this.initTable(this.emails);
          this.tableSettings();
          this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    );
  }

  /**Loads all available email templates */
  loadEmails() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminEmail.load().subscribe(res => {
        this.emails = res;
        this.kiiAdminEmail.set(this.emails);
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
         case 'description': return item.description;
         default: return item[property];
      }
    };
  }

  /**Creates a new template based on the reference */
  onCreate(value:any) {
    console.log(value);
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminEmail.create(value).subscribe(res => {
          this.kiiAdminEmail.addUnshift(res);
          this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }

  /**Deletes a template */
  onDelete(email:Email) {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: "admin-theme",
      data: {text: "admin.email.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.isDataLoading = true;
        console.log("Deleting",email);

        this.addSubscriber(
          this.kiiAdminEmail.delete(email).subscribe(res => {
            this.kiiAdminEmail.splice(email);
            this.isDataLoading = false;
          }, () => this.isDataLoading = false)
        )
      }
    });
  }

  /**Opens the dialog of the image gallery when asked */
  onRequestImage() {
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

  /**Saves template modifications */
  onSaveTemplate(email:Email,data:IEmailData) {
    console.log("Saving",email,data);
    email.data = JSON.stringify(data);
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminEmail.update(email).subscribe(res => {
        console.log(res);
        this.isDataLoading = false;
      },()=>this.isDataLoading = false)
    )
  }

  onSendEmail(email:Email) {
    console.log("Sending email",JSON.parse(email.data));
    this.addSubscriber(
      this.kiiAdminEmail.test(email).subscribe(res => {
        console.log("HTML:",res);
      })
    )
  }


}
