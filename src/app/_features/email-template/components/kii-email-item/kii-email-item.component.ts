import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { KiiEmailTemplateService } from '../../services/kii-email-template.service';
import { EmailItem } from 'src/app/_features/email-builder/services/kii-email-builder.service';



@Component({
  selector: 'kii-email-item',
  templateUrl: './kii-email-item.component.html',
  styleUrls: ['./kii-email-item.component.scss']
})
export class KiiEmailItemComponent  implements OnInit {

  @Input() item: EmailItem;
  icons = [];


  constructor(
    private service : KiiEmailTemplateService
    ) { 
    }



  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);

  }

  /**Gets the classes of the block */
  getClasses() {
    let result = {};
    result[this.item.type] = true;
    result['is-active'] = this.item.isActive;
    return result;
  }

  /**Sets this block as active */
  onClick(event) {
    console.log("CLICKED ON ITEM");
    //Check if parent has also an active child
/*    if (this.item.parent.isActive || this.item.hasSblingActive()) {
      event.stopPropagation();
      this.service.setActiveElement(this.item.id);
    }*/
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
