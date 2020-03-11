import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { KiiEmailTemplateService, EItemType, IEmailWidget } from '../../services/kii-email-template.service';
import { EmailItem } from 'src/app/_features/email-template/services/kii-email-template.service';
import { isNgTemplate } from '@angular/compiler';



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
    //console.log(changes);

  }

  /**Gets the classes of the block */
  getClasses(item:EmailItem) {
    let result = {};
    result[item.getType()] = true;
    result['is-active'] = item.isActive;
    if (item.getWidth()) {
      if (item.getWidth() == "100%" || item.getWidth() == "50%" || item.getWidth() == "33%") 
        result['flex-1'] = true;
      if (item.getWidth() == "66%")
        result['flex-2'] = true;
    }
    switch (item.getAlignHorizontal()) {
      case "left": result['h-start'] = true; break;
      case "center": result['h-center'] = true; break;
      case "right": result['h-end'] = true; break;
    }
    switch (item.getAlignVertical()) {
      case "top": result['v-start'] = true; break;
      case "center": result['v-center'] = true; break;
      case "bottom": result['v-end'] = true; break;
    }
    return result;
  }

  /**Sets this block as active */
  onClick(event) {
    console.log("CLICKED ON ITEM",this.item.widget);
    //Check if parent has also an active child
    let isParentActive = false;
    if (this.item.parent==null) isParentActive = true;
    if (this.item.parent && this.item.parent.isActive) isParentActive = true;

    if (isParentActive || this.item.hasSblingActive()) {
        //Reset is active of all elements of the level
        this.item.resetActive();
        event.stopPropagation();
        this.item.isActive = true;
    }

  }

  /**When widget has changes ! */
  onWidgetChanges(event:IEmailWidget) {
    console.log("We have got widget changes !",event);
    console.log("CURRENT ITEM",this.item);
    //Need to update widget data !
    this.item.setWidget(event,this.item);
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
