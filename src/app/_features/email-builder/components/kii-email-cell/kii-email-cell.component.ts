import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { EmailBlock, KiiEmailBuilderService, EmailItem, EmailCell, EItemTypes } from '../../services/kii-email-builder.service';
import { FaLayersTextBaseComponent } from '@fortawesome/angular-fontawesome/layers/layers-text-base.component';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';



@Component({
  selector: 'kii-email-cell',
  templateUrl: './kii-email-cell.component.html',
  styleUrls: ['./kii-email-cell.component.scss']
})
export class KiiEmailCellComponent implements OnInit {
  @Input() cell : EmailCell;
  @Input() isBlockActive : boolean = false;
  icons = {
    "add": faPlusSquare
  };

  itemTypes : EItemTypes[] = EmailItem.getAllItemTypes();




  constructor(
    private service : KiiEmailBuilderService
    ) { 
    }



  ngOnInit() {
 
  }

  /*ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    console.log(this.isBlockActive);
  }*/

  /**Gets the classes of the block */
  getClasses() {
    let result = {};
 //   result[this.block.type] = true;
 //   result['is-active'] = this.block.isActive;
    return result;
  }

  /**Sets this cell as active if block is selected */
  onClick(index:number) {
    console.log(this.cell, this.isBlockActive);
    if (this.isBlockActive)
    this.service.setActiveCell(index);
  }

  /**Creates new item */
  onCreateItem(type:EItemTypes) {
    console.log("Need to create item",type);
    this.service.createItem(type);
  }

  /**Gets icon of specified type */
  getIcon(type:EItemTypes) {
    return EmailItem.getIcon(type);
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
