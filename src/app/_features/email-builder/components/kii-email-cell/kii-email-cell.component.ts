import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { EmailBlock, KiiEmailBuilderService, EmailItem, EmailCell } from '../../services/kii-email-builder.service';



@Component({
  selector: 'kii-email-cell',
  templateUrl: './kii-email-cell.component.html',
  styleUrls: ['./kii-email-cell.component.scss']
})
export class KiiEmailCellComponent implements OnInit {
  @Input() cell : EmailCell;


  icons = [];



  constructor(
    private service : KiiEmailBuilderService
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
 //   result[this.block.type] = true;
 //   result['is-active'] = this.block.isActive;
    return result;
  }

  /**Sets this block as active */
  onClick(index:number) {
    this.service.setActiveBlock(index);
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
