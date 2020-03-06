import { Component, OnInit, Output, EventEmitter, SimpleChange, Input } from '@angular/core';
import { KiiEmailBuilderService, EmailBlock, EBlockTypes, EContextTypes, EItemTypes, EmailItem, EmailCell } from '../../services/kii-email-builder.service';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';



@Component({
  selector: 'kii-email-common-toolbar',
  templateUrl: './kii-email-common-toolbar.component.html',
  styleUrls: ['./kii-email-common-toolbar.component.scss']
})
export class KiiEmailCommonToolbarComponent  implements OnInit {

  @Input() context : EContextTypes = EContextTypes.BODY;

  icons :any = {
    add: faPlusSquare,
    bgColor: faPalette,
    color: faTint
  };

  itemTypes = EmailItem.getAllItemTypes();

  constructor(
    private service : KiiEmailBuilderService
    ) { 
    }

  ngOnInit() { 
  }


  /**Change background color */
  onBgColor(event:any) {
    if (event && event.target && event.target.value) {
      console.log("BG CHANGE",event.target.value);
      this.service.setBackgroundColor(this.context,event.target.value);
    }
  }
  /**Change text color */
  onColor(event:any) {
    if (event && event.target && event.target.value) {
      console.log("BG CHANGE",event.target.value);
      this.service.setColor(this.context,event.target.value);
    }
  }

  /**Returns if context is cell */
  isCellContext() {
    return this.context == EContextTypes.CELL;
  }

  /**Add item */
  addItem(type:EItemTypes) {
    console.log("ADDING ITEM !!!!");
    this.service.createItem(type);
  }

  getIcon(type:EItemTypes) {
    return EmailItem.getIcon(type);
  }


  onClick(event) {
    event.stopPropagation();
  }
}
