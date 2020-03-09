import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input } from '@angular/core';
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
import { environment } from 'src/environments/environment.js';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract.js';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component.js';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiEmailTemplateService, EmailItem } from '../../services/kii-email-template.service';



@Component({
  selector: 'kii-email-editor',
  templateUrl: './kii-email-editor.component.html',
  styleUrls: ['./kii-email-editor.component.scss']
})
export class KiiEmailEditorComponent extends KiiFormAbstract implements OnInit {
  icons = [];
  @Input() item: EmailItem = new EmailItem(); //Here we should get a json and recreate from here for now empty


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();




  constructor(
    private service: KiiEmailTemplateService,
    ) { 
      super();
      this.item = new EmailItem(
        {"type":"container","position":0,"width":"100%","bgColor":"white","txtColor":"black","font":null,"fontSize":null,"fontStyle":null,"childs":[{"type":"block","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[{"type":"cell","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[{"type":"item","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[],"widget":{"type":"heading"}}],"widget":null}],"widget":null},{"type":"block","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[{"type":"cell","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[],"widget":null}],"widget":null},{"type":"block","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[{"type":"cell","position":0,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontStyle":null,"childs":[],"widget":null}],"widget":null}],"widget":null}
        );


    }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.item);


  }

  outputData() {
    console.log(this.item.getJson());
  }

}
