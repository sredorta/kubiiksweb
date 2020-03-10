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
        {"id":0,"type":"container","position":0,"width":"100%","bgColor":"white","txtColor":"black","font":"Verdana","fontSize":"16px","fontBold":false,"fontItalic":false,"fontUnderline":false,"childs":[{"id":2,"type":"block","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":3,"type":"cell","position":1,"width":"33%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":9,"type":"item","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text"},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":4,"type":"cell","position":2,"width":"66%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":5,"type":"item","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text"},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":6,"type":"item","position":2,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text"},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":7,"type":"item","position":3,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text"},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":8,"type":"item","position":4,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text"},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}
        );
      this.item.isActive = true;


    }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.item);


  }

  outputData() {
    console.log(this.item.getJson());
  }

}