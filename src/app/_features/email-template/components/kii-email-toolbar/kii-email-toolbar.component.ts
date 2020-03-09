import { Component, OnInit, Output, EventEmitter, SimpleChange, Input } from '@angular/core';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { EmailItem, KiiEmailTemplateService, EBlockType, EWidgetType } from '../../services/kii-email-template.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';



@Component({
  selector: 'kii-email-toolbar',
  templateUrl: './kii-email-toolbar.component.html',
  styleUrls: ['./kii-email-toolbar.component.scss']
})
export class KiiEmailToolbarComponent  implements OnInit {

  @Input() item : EmailItem;

  icons :any = {
    add: faPlusSquare,
    color: faPalette,
    bgColor: faTint,
    font:faFont
  };

 
  constructor(
    private service : KiiEmailTemplateService
    ) { 
    }

  ngOnInit() { 
    //console.log("MY ITEM", this.item)
  }


  /**Create a new block if required */
  onAddBlock(parent:EmailItem, type:EBlockType) {
    parent.addBlock(type);
  }

  onAddWidget(parent:EmailItem, type:EWidgetType) {
    this.item.addWidget(type);
  }

  /**Change background color */
  onBgColor(event:any) {
      if (event && event.target && event.target.value) {
        this.item.setBgColor(event.target.value)
      }
  }
  /**Change text color */
  onColor(event:any) {
      if (event && event.target && event.target.value) {
        this.item.setColor(event.target.value)
      }
  }

  /**When we change font size */
  onSetFontSize(parent:EmailItem,size:string) {
    console.log("Setting font size to:",size);
    this.item.setFontSize(size);
  }

  /**When we change the font */
  onSetFont(parent:EmailItem,font:string) {
    console.log("Setting font:",font);
    this.item.setFont(font);
  }

}
