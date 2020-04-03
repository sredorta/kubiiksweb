import { Component, OnInit, Output, EventEmitter, SimpleChange, Input, SimpleChanges } from '@angular/core';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { KiiEmailTemplateService, EBlockType, EWidgetType, EFontType, EElemType, IEmailCell, IEmailData } from '../../services/kii-email-template.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons/faMousePointer';
import { MatSliderChange } from '@angular/material';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste';



@Component({
  selector: 'kii-email-container-toolbar',
  templateUrl: './kii-email-container-toolbar.component.html',
  styleUrls: ['./kii-email-container-toolbar.component.scss']
})
export class KiiEmailContainerToolbarComponent  implements OnInit {

  @Input() elemId : number;

  @Output() onSave  = new EventEmitter<boolean>();

  type : string;

  icons :any = {
    cursor: faMousePointer,
    add: faPlusSquare,
    color: faPalette,
    bgColor: faTint,
    font:faFont,
    bold: faBold,
    italic:faItalic,
    underline:faUnderline,
    trash: faTrash,
    up: faChevronUp,
    down: faChevronDown,
    menu: faEllipsisV,
    image: faImage,
    text: faParagraph,
    button: faLink,
    save: faSave,
    copy: faCopy,
    paste: faPaste
  };

 
  constructor(
    public service : KiiEmailTemplateService
    ) { 
    }

  ngOnInit() { 
    this.type = <string>this.service.getElementType(this.elemId);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.elemId) {
      this.elemId = changes.elemId.currentValue;
      this.type = <string>this.service.getElementType(this.elemId);
    }

  }

  isContainer() {
    return this.type == EElemType.CONTAINER;
  }

  isBlock() {
    return this.type == EElemType.BLOCK;
  }

  isCell() {
    return this.type == EElemType.CELL;
  }

  isWidget() {
    return this.type == EElemType.WIDGET;
  }


  /**Create a new block if required */
  onAddBlock(type:EBlockType) {
    this.service.addBlock(type);
  }

  getBlocks() {
    return this.service.getBlocks();
  }

  /**Removes selected item */
  onRemoveItem() {
    this.service.remove(this.elemId);
  }

  /**Moves up selected item */
  onMoveUpItem() {
    this.service.moveUp(this.elemId);
  }

  /**Moves down selected item */
  onMoveDownItem() {
    this.service.moveDown(this.elemId);
  }

  /**Changes background color */
  onBgColor(id:number,event:any) {
    if (event && event.target && event.target.value) {
      let elem = this.service._findId(id);
      elem.bgColor = event.target.value; 
    }
  }

  /**Changes background color */
  onTxtColor(id:number,event:any) {
      if (event && event.target && event.target.value) {
        let elem = this.service._findId(id);
        elem.txtColor = event.target.value; 
      }
  }

  /**Sets font style */
  setFontStyle(id:number,style:'bold' | 'italic' | 'underline') {
    let elem =this.service._findId(id);
    switch (style) {
      case 'bold': 
        if (elem.fontBold == null || elem.fontBold == undefined)
          elem.fontBold = true; 
        else 
          elem.fontBold = !elem.fontBold;  
        break;
      case 'italic': 
        if (elem.fontItalic == null || elem.fontItalic == undefined)
          elem.fontItalic = true; 
        else 
          elem.fontItalic = !elem.fontItalic;  
        break;
      case 'underline': 
        if (elem.fontUnderline == null || elem.fontUnderline == undefined)
          elem.fontUnderline = true; 
        else 
          elem.fontUnderline = !elem.fontUnderline;  
        break;        
    }
  }

  /**Sets font size */
  onSetFontSize(id:number, size:string) {
    let elem = this.service._findId(id);
    elem.fontSize = size;
  }

  /**Sets font family */
  onSetFont(id:number,family:string) {
    let elem = this.service._findId(id);
    elem.font = family;
  }

  /**Stops event propagation */
  onClickStop(event) {
    event.stopPropagation();
  }

  /**When changing horizontal alignment */
  onHorizontalAlign(id:number,alignment:string) {
    let elem = this.service._findId(id);
    elem.hAlign = alignment;
  }

  /**When changing horizontal alignment */
  onVerticalAlign(id:number,alignment:string) {
      let elem = this.service._findId(id);
      elem.vAlign = alignment;
  }
  /**When changing cell padding */
  onPaddingChange(id:number,side:string,event:MatSliderChange) {
    let elem = this.service._findId(id);
    switch (side) {
      case 'top': elem.paddingTop = event.value; break;
      case 'bottom': elem.paddingBottom = event.value; break;
      case 'left': elem.paddingLeft = event.value; break;
      case 'right': elem.paddingRight = event.value; break;      
    }

  }

  /**Returns the widget icon associated with the type */
  getWidgetIcon(type:EWidgetType) {
    return this.icons[type];
  }

  onAddWidget(id:number,type:EWidgetType) {
    this.service.addWidget(id,type);
  }

  onSaveData() {
    this.onSave.emit(true);
  }
  onCopyData() {
    console.log("Copy data");
    console.log(this.service.getJson());
    this.service.saveData();
  }
  onPasteData() {
    console.log("Paste data");
    this.service.restoreData();
  }

  canPaste() {
    return this.service.hasSavedData();
  }

}
