import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faPenNib } from '@fortawesome/free-solid-svg-icons/faPenNib';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service.js';
import { environment } from 'src/environments/environment.js';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract.js';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component.js';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'kii-email-preview',
  templateUrl: './kii-email-preview.component.html',
  styleUrls: ['./kii-email-preview.component.scss']
})
export class KiiEmailPreviewComponent extends KiiBaseAbstract implements OnInit {

  @Input() html :string = "";

   /**Trusted html */
  trustedHtml : SafeHtml = "";

  constructor(
    private sanitizer: DomSanitizer,
    private kiiTrans: KiiTranslateService, 
    private kiiAuth: KiiMainUserService
    ) { 
      super();
    }



  ngOnInit() {
    this.kiiTrans.setRequiredContext(['admin']);
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.html);
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log("Changes",changes)
    if (changes.html) {
      this.html = changes.html.currentValue;
      this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.html);
    }
  }


}
