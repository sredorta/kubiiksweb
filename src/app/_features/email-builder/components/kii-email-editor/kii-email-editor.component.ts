import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2 } from '@angular/core';
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
import { KiiEmailBuilderService, EmailStructure } from '../../services/kii-email-builder.service';
import { KiiEmailBlockComponent } from '../kii-email-block/kii-email-block.component';



@Component({
  selector: 'kii-email-editor',
  templateUrl: './kii-email-editor.component.html',
  styleUrls: ['./kii-email-editor.component.scss']
})
export class KiiEmailEditorComponent extends KiiFormAbstract implements OnInit {
  icons = [];

  /**Contains the updated data */
  data : EmailStructure = new EmailStructure();

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();


  structure = this.service.getJson();


  constructor(
    private service: KiiEmailBuilderService,
    ) { 
      super();

      console.log("DATA", this.data.txtColor);
    }



  ngOnInit() {
    this.service.onChange.subscribe(res => {
      this.data = res;
      console.log("Structure changed",res);
    })

  }

  outputData() {
    console.log(this.data);
  }

}
