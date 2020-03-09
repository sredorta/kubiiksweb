import { Injectable } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';


//ITEM ELEMENT HAS ONE WIDGET
export interface IEmailWidget {
    type: EWidgetType | string;
    content?:string;
}
export class EmailWidget {
  private _data : IEmailWidget = {
    type : EWidgetType.TEXT,
    content:null
  }
  constructor(obj: IEmailWidget) {
    this._data.type = obj.type;
    this._data.content = obj.content;
  }

  getType() {
    return this._data.type;
  }

  /**Returns if widget is image */
  isImage() {
    return this._data.type == EWidgetType.IMAGE;
  }

  /**Returns if widget is text */
  isText() {
    return this._data.type == EWidgetType.TEXT;
  }

  /**Returns if widget is heading */
  isHeading() {
    return this._data.type == EWidgetType.HEADING;
  }

  /**Returns data of the widget */
  getData() {
    return this._data;
  }

}


//Enumerators
export enum EItemType {
  CONTAINER = "container",
  BLOCK = "block",
  CELL = "cell",
  ITEM = "item"
}

export enum EWidgetType {
  HEADING ="heading",
  TEXT = "text",
  IMAGE = "image"
}

export enum EFontType {
  NORMAL = "normal",
  BOLD = "bold",
  ITALIC = "italic"
}

export enum EBlockType {
  SIMPLE = "simple",
  DOUBLE = "double",
  DOUBLE_LEFT = "double_left",
  DOUBLE_RIGHT = "double_right",
  TRIPLE = "triple"
}

export interface IEmailItem {

  /**Position of the element */
  position?:number;

  /**Email item type : container,block,cell... */
  type: EItemType | string;

  /**Width property */
  width?:string;

  /**Background color */
  bgColor?:string;

  /**Text color */
  txtColor?:string;

  /**Font to use for the element */
  font?:string;

  /**Font size to use for the element */
  fontSize?:string;

  /**Font type to use for the element: bold, italyc... */
  fontStyle?: EFontType | string;

  /**Children elements */
  childs?: IEmailItem[];

  /**Child widget if element is of type ITEM */
  widget?: IEmailWidget | any;
}


export class EmailItem {
  private _data: IEmailItem = {
    type : EItemType.CONTAINER,
    position:0,
    width:"100%",
    bgColor:null,
    txtColor:null,
    font:null,
    fontSize:null,
    fontStyle:null,
    childs:[],
    widget: null
  };
  isActive : boolean = false;
  parent: EmailItem = null;
  children : EmailItem[] = [];
  widget: EmailWidget = null;

  constructor(obj?:IEmailItem) {
    console.log("Constructing element with ",obj);
    if (obj) {
      if (obj.position) {
        this._data.position = obj.position
      } else {
        //TODO find latest position and assign
      }
      this._data.type = obj.type;
      if (obj.width)    this._data.width = obj.width;
      if (obj.bgColor)  this._data.bgColor = obj.bgColor;
      if (obj.txtColor) this._data.txtColor = obj.txtColor;
      if (obj.font)     this._data.font = obj.font;
      if (obj.fontSize) this._data.fontSize = obj.fontSize;
      if (obj.fontStyle)this._data.fontStyle = obj.fontStyle;
      if (obj.childs) { 
         this._data.childs = obj.childs;
         for (let child of obj.childs) {
           this.children.push(new EmailItem(child));
         }
      } else {
        this._data.childs = [];
      }
      if (obj.widget){
         this._data.widget = obj.widget;
         this.widget = new EmailWidget({type:obj.widget.type});
      }

    } else {
      //Set defaults for container
      this._data.bgColor = "white";
      this._data.txtColor = "black";
    }
    console.log("Resulting element",this._data);
  }


  /**Returns list of ETemTypes */
  getAllItemTypes() {
      return Object.values(EItemType);
  }

  /**Returns list of Block types */
  getAllBlockTypes() {
    return Object.values(EBlockType);
  } 

  /**Returns list of widgets */
  getAllWidgetTypes() {
    return Object.values(EWidgetType);
  } 

  /**Returns if the item is container */
  isContainer() {
    return this._data.type == EItemType.CONTAINER;
  }

  /**Returns if the item is a block row */
  isBlock() {
    return this._data.type == EItemType.BLOCK;
  }

  /**Returns if the item is cell */
  isCell() {
    return this._data.type == EItemType.CELL;
  }

  /**REturns if the item is a item type */
  isItem() {
    return this._data.type == EItemType.ITEM;
  }

  /**Returns if the item is a widget */
  isWidget() {
    if (this.widget) return true;
    return false;
  }
  
  /**Gets the data of the item */
  getData() {
    return this._data;
  }

  /**Returns the children of the element */
  getChildren() {
    return this.children;
  }


  /**Returns the type of the item */
  getType() {
    return this._data.type;
  }

  /**Returns the width of the item */
  getWidth() {
    return this._data.width;
  }

  /**Sets text color of item */
  setColor(color:string) {
    this._data.txtColor = color;
  }

  /**Sets background color of item */
  setBgColor(color:string) {
    this._data.bgColor = color;
  }

  /**Gets the json data*/
  getJson() {
    let container = this.getContainer();
    return JSON.stringify(container._data);
  }

  /**Returns the color of the item by going up in the hiearchy if not defined */
  getColor() {
    //TODO if null get recursivelly on parent until not null
    function _getColor(item:EmailItem) {
      if (item._data.txtColor){
        return item._data.txtColor;
      } 
      if (item.parent)
        return _getColor(item.parent)
    }  
    return _getColor(this);
  }

  getBgColor() {
        //TODO if null get recursivelly on parent until not null
    function _getBgColor(item:EmailItem) {
          if (item._data.bgColor){
            return item._data.bgColor;
          } 
          if (item.parent)
            return _getBgColor(item.parent)
    }    
    return _getBgColor(this);
  }

  /**Removes any active element by recurivelly going down on children */
  resetActive() {
    let container = this.getContainer();
    _removeActive(container);
    
    function _removeActive(item:EmailItem) {
        if (item.children.length) {
            for (let elem of item.children) {
              elem.isActive = false;
              _removeActive(elem)
            }
        }
    }
  }

  /**Gets the root element by recursivelly going parents up */
  getContainer() {
    function _getParent(item:EmailItem) {
      if (item.parent)
        return _getParent(item.parent)
      else
        return item;
    }
    return _getParent(this);
  }


  /**Adds child to element by keeping parents... correct */
  addChild(child:IEmailItem,parent?:EmailItem) {
    if (!parent) parent = this;
    let myChild = new EmailItem(child);
    parent._data.childs.push(myChild._data);
    parent.children.push(myChild)
    myChild.parent = parent;
    return myChild;
  }

  /**Add a block to element */
  addBlock(type: EBlockType) {
    let cell : IEmailItem = {
      width: "100%",
      type: EItemType.CELL,
    }
    let block : IEmailItem = {
      type: EItemType.BLOCK,
    }

    switch (type) {
      case EBlockType.SIMPLE: {
         let myBlock = this.addChild(block);
         this.addChild(cell,myBlock);
         break;
      }
      case EBlockType.DOUBLE: {
        let myBlock = this.addChild(block);
        cell.width = "50%";
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.DOUBLE_LEFT: {
        let myBlock = this.addChild(block);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        cell.width = "66%";
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.DOUBLE_RIGHT: {
        let myBlock = this.addChild(block);
        cell.width = "66%";
        this.addChild(cell,myBlock);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.TRIPLE: {
        let myBlock = this.addChild(block);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        break;
      }                  
    }
  }

  /**Adds a widget to the current cell by creating an item with a widget inside */
  addWidget(type:EWidgetType) {
      console.log("WE WILL ADD WIDGET",type);
      let item : IEmailItem = {
        type: EItemType.ITEM
      }
      let myItem = this.addChild(item);
      myItem._data.widget = <IEmailWidget>{type:type};
      myItem.widget = new EmailWidget(myItem._data.widget);
  }




  /**Returns if there is a sibling active element */
  hasSblingActive() {
    if (!this.parent) return false;
    let active = this.parent.getChildren().find(obj=>obj.isActive == true);
    if (active) return true;
    return false;
  }

}



@Injectable({
  providedIn: 'root'
})
export class KiiEmailTemplateService {

  private container : EmailItem = new EmailItem();

  constructor() { }

/*  getContainer() {
    return this.container;
  }*/

  /**Adds child to element by keeping parents... correct */
  /*addChild(child:IEmailItem,parent?:EmailItem) {
    if (!parent) parent = this;
    parent._data.childs.push(child);
    let myChild = new EmailItem(child);
    parent.children.push(myChild)
    myChild.parent = parent;
    return myChild;
  }*/

  /**Add a block to element */
  /*addBlock(type: EBlockType) {
    let cell : IEmailItem = {
      width: "100%",
      type: EItemType.CELL,
    }
    let block : IEmailItem = {
      type: EItemType.BLOCK,
    }

    switch (type) {
      case EBlockType.SIMPLE: {
         let myBlock = this.addChild(block);
         this.addChild(cell,myBlock);
         break;
      }
      case EBlockType.DOUBLE: {
        let myBlock = this.addChild(block);
        cell.width = "50%";
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.DOUBLE_LEFT: {
        let myBlock = this.addChild(block);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        cell.width = "66%";
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.DOUBLE_RIGHT: {
        let myBlock = this.addChild(block);
        cell.width = "66%";
        this.addChild(cell,myBlock);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        break;
      }
      case EBlockType.TRIPLE: {
        let myBlock = this.addChild(block);
        cell.width = "33%";
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        this.addChild(cell,myBlock);
        break;
      }                  
    }
  }  */



}
