import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
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
import { EmailBlock, KiiEmailBuilderService, EContextTypes, EmailStructure } from '../../services/kii-email-builder.service';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';



@Component({
  selector: 'kii-email-block',
  templateUrl: './kii-email-block.component.html',
  styleUrls: ['./kii-email-block.component.scss']
})
export class KiiEmailBlockComponent extends KiiFormAbstract implements OnInit {

  @Input() block : EmailBlock;

  color = this.service.getTxtColor(this.block);
  background = this.service.getBackgroundColor(this.block);


  icons :any = {
    color: faPalette
  };

  context = EContextTypes.BLOCK;

  /**Contains the updated data */
  data : EmailStructure = new EmailStructure();

  constructor(
    private service : KiiEmailBuilderService
    ) { 
      super();
    }



  ngOnInit() {
    console.log("Found cells:",this.block.cells)
    this.service.onChange.subscribe(res => {
      this.data = res;
    })
  }


  /**Gets the classes of the block */
  getClasses() {
    let result = {};
    result[this.block.type] = true;
    result['is-active'] = this.block.isActive;
    return result;
  }

  /**Sets this block as active */
  onClick(event) {
    //If there is no other block active then set this block as active
      event.stopPropagation();
      this.service.setActiveElement(this.block.id);

    //this.service.setActiveBlock(index);
  }

  /**Show block toolbar when block is active but no cells are active in the block */
  showToolbar() {
    if (!this.block.isActive) return false;
    let cell = this.block.cells.find(obj => obj.isActive == true);
    if (cell) return false;
    return true;
  }








  /**Retruns email complete structure */
  /*createStructure(header:string,content:string,footer:string) {
    return `
    <table border="1" cellpadding="0" cellspacing="0" width="100%">
     <tr>
      <td>
        <table align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse;max-width:600px;width:100%">
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
  }*/
  

}
