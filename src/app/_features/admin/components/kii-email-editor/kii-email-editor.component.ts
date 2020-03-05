import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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



@Component({
  selector: 'kii-email-editor',
  templateUrl: './kii-email-editor.component.html',
  styleUrls: ['./kii-email-editor.component.scss']
})
export class KiiEmailEditorComponent extends KiiFormAbstract implements OnInit {

  icons = [];

  /**Upload configuration */
  config: IConfigImageUpload ={
    storage:DiskType.EMAIL,
    crop:false,
    maxSize:600
  };

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private kiiTrans: KiiTranslateService, 
    private kiiAuth: KiiMainUserService
    ) { 
      super();
    }



  ngOnInit() {
    this.kiiTrans.setRequiredContext(['admin']);
    this.config = {
      label:'admin.summary.image.t', 
      hint:'admin.summary.image.s',
      buttonsPosition:'right',
      storage: DiskType.EMAIL,
      maxWidth:'120px',
      maxSize:600,
      crop:false,
      defaultImage: './assets/kiilib/images/no-photo.svg'
    }
    console.log(this.config);
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({
      content: new FormControl('', Validators.compose([
      ])),
    });
  }

  onSubmit(value:any) {
    console.log("Submitting value:",value);
    console.log(this.createStructure("Header",value.content,"Footer"))
  }

  /**Retruns email complete structure */
  createStructure(header:string,content:string,footer:string) {
    return `
    <table border="1" cellpadding="0" cellspacing="0" width="100%">
     <tr>
      <td>
        <table align="center" border="1" cellpadding="0" cellspacing="0" width="100%" max-width="600" style="border-collapse: collapse;">
          <tr>
            <td>
            ${header}
            </td>
          </tr>
          <tr>
            <td>
            ${content}
            </td>
          </tr>
          <tr>
            <td>
            ${footer}
            </td>
          </tr>          
        </table>
      </td>
     </tr>
    </table>
    `;
  }
  /**Adds final structure with body... */
  wrapStructure() {
    //TODO
  }


  onContentChange(content:string) {
    console.log("Content:",content);
    this.onChange.emit(this.createStructure("Header",content,"Footer"))
  }

}
