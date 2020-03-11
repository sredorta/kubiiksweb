import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, SimpleChanges } from '@angular/core';
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

  /**Request for a new image so that the dialog can be open */
  @Output() onRequestImage = new EventEmitter<boolean>();

  /**Result of the image uploaded */
  @Input() resultImage: string = null; 

  imageRequestId:number;


  constructor(
    private service: KiiEmailTemplateService,
    ) { 
      super();
      this.item = new EmailItem(

{"id":8,"type":"container","position":0,"width":"100%","bgColor":"white","txtColor":"black","font":"Verdana","fontSize":"16px","fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":9,"type":"block","position":2,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":10,"type":"cell","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"image","content":{"textarea":"","url":"https://localhost:4300/server/public/images/email/i-forgot-day-fun__1583406795053.jpg","txtBtn":"Button","typeBtn":"link","colorBtn":"#303030","imgWidth":40}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":{"type":"button","content":{"textarea":"","url":"http://www.google.com","txtBtn":"googel link","colorBtn":"#c0c0c0","typeBtn":"flat"}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":11,"type":"block","position":1,"width":"100%","bgColor":"#000000","txtColor":"#ffffff","font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":12,"type":"cell","position":1,"width":"33%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":14,"type":"item","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"image","content":{"textarea":"","url":"https://localhost:4300/server/public/images/email/icon-512x512__1583930290357.png","txtBtn":"Button","typeBtn":"link","colorBtn":"#303030","imgAlt":"Logo","imgWidth":100}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":13,"type":"cell","position":2,"width":"66%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":15,"type":"item","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":"28px","fontBold":true,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text","content":{"textarea":"kubiiks"}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":16,"type":"item","position":2,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":"24px","fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text","content":{"textarea":"Mot de passe oublié"}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":20,"paddingRight":0,"hAlign":"left","vAlign":"center"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}
      

)
      this.item.isActive = true;
      
      //Emit image request if required
      this.service.imageRequest.subscribe(res => {
        this.imageRequestId = res;
        this.onRequestImage.emit(true);
      })
    }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.item);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.resultImage) {
      this.service.image = changes.resultImage.currentValue;
      this.service.isImageAvailable.next(this.imageRequestId);
    }
  }

  outputData() {
    console.log(this.item.getJson());
  }

}
