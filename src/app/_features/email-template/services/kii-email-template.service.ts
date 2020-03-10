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
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE="underline"
}

export enum EBlockType {
  SIMPLE = "simple",
  DOUBLE = "double",
  DOUBLE_LEFT = "double_left",
  DOUBLE_RIGHT = "double_right",
  TRIPLE = "triple"
}

export interface IEmailItem {

  /**Unique identifier of the element */
  id?:number;

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

  /**Bold font*/
  fontBold?: boolean;

  /**Italic font */
  fontItalic?:boolean;

  /**Underline font */
  fontUnderline?: boolean;

  /**Children elements */
  childs?: IEmailItem[];

  /**Child widget if element is of type ITEM */
  widget?: IEmailWidget | any;
}


export class EmailItem {
  private _data: IEmailItem = {
    id : null,
    type : EItemType.CONTAINER,
    position:0,
    width:"100%",
    bgColor:null,
    txtColor:null,
    font:null,
    fontSize:null,
    fontBold:null,
    fontItalic:null,
    fontUnderline:null,
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
      if (obj.id)       this._data.id = obj.id;
      if (obj.position) this._data.position = obj.position
      this._data.type = obj.type;
      if (obj.width)    this._data.width = obj.width;
      if (obj.bgColor)  this._data.bgColor = obj.bgColor;
      if (obj.txtColor) this._data.txtColor = obj.txtColor;
      if (obj.font)     this._data.font = obj.font;
      if (obj.fontSize) this._data.fontSize = obj.fontSize;
      if (obj.fontBold) this._data.fontBold = obj.fontBold;
      if (obj.fontItalic) this._data.fontItalic = obj.fontItalic;
      if (obj.fontUnderline) this._data.fontUnderline = obj.fontUnderline;
      if (obj.childs) { 
         this._data.childs = obj.childs;
         for (let child of obj.childs) {
           let myChild = new EmailItem(child)
           this.children.push(myChild);
           myChild.parent = this;
         }
      } else {
        this._data.childs = [];
      }
      if (obj.widget){
         this._data.widget = obj.widget;
         this.widget = new EmailWidget({type:obj.widget.type});
      }
      this.setId();

    } else {
      //Set defaults for container
      this._data.bgColor = "white";
      this._data.txtColor = "black";
      this._data.font = "Verdana";
      this._data.fontSize="16px";
      this._data.fontBold=false;
      this._data.fontItalic = false;
      this._data.fontUnderline = false;
      this._data.id = 0;
    }
    console.log("Resulting element",this._data);
  }


  /**Returns available font sizes */
  getAllFontSizes() {
    return ["12px","14px","16px","18px","24px","28px"];
  }

  /**Returns array of fonts */
  getAllFonts() {
    return [
      "Arial",
      "Arial black",
      "Arial Narrow",
      "Courier New",
      "Georgia",
      "Verdana",
      "Times New Roman",
    ]
  }

  /**Returns list of EItemTypes */
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

  /**Returns the children of the element ordered by position */
  getChildren() {
    return this.children.sort((a,b)=> a._data.position>b._data.position?1:-1);
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

  /**Sets the fontSize of the item */
  setFontSize(size:string) {
    this._data.fontSize = size;
  }

  /**Sets the font familyt for the item */
  setFont(family:string) {
    this._data.font = family;
  }

  /**Sets the font bold */
  setFontBold(value:boolean) {
      this._data.fontBold = value;
  }

  /**Sets the font underline */
  setFontUnderline(value:boolean) {
    this._data.fontUnderline = value;
  }  

  /**Sets the font italic */
  setFontItalic(value:boolean) {
    this._data.fontItalic = value;
  }

  /**Sets Id to the next identifier */
  setId() {
    this._data.id = this._getNextId();
  }

  /**Gets next available id */
  private _getNextId() {
    let maxId : any = {value:0};
    let container = this.getContainer();
    function _getId(item:EmailItem,max:any) {
      if (item._data.id>max.value)
        max.value = item._data.id;
      for (let child of item.children) {
        _getId(child,max);
      }
    }  
    _getId(container,maxId);
    return maxId.value+1;
  }

  /**Sets position so that we can reorder in array blocks */
  setPosition() {
    if (this.parent) {
      let max = 0;
      for (let child of this.parent.children) {
        if (child._data.position>max) {
          max = child._data.position;
        }
      }
      this._data.position = max +1;
    }
  }

  /**Gets the json data*/
  getJson() {
    let container = this.getContainer();
    console.log("CONTAINER DATA",container);
    return JSON.stringify(container._data);
  }

  /**Returns the color of the item by going up in the hiearchy if not defined */
  getColor() {
    function _getColor(item:EmailItem) {
      if (item._data.txtColor){
        return item._data.txtColor;
      } 
      if (item.parent)
        return _getColor(item.parent)
    }  
    return _getColor(this);
  }

  /**Returns the background color of the item by going up in the hierarchy if not defined */
  getBgColor() {
    function _getBgColor(item:EmailItem) {
          if (item._data.bgColor){
            return item._data.bgColor;
          } 
          if (item.parent)
            return _getBgColor(item.parent)
    }    
    return _getBgColor(this);
  }

  /**Returns the text fontSize of the item by going up in the hierarchy if not defined */
  getFontSize() {
    function _getFontSize(item:EmailItem) {
        if (item._data.fontSize){
          return item._data.fontSize;
        } 
        if (item.parent)
          return _getFontSize(item.parent)
    }    
    return _getFontSize(this);
  }

  /**Returns the text font family of the item by going up in the hierarchy if not defined */
  getFont() {
    function _getFont(item:EmailItem) {
        if (item._data.font){
          return item._data.font;
        } 
        if (item.parent)
          return _getFont(item.parent)
    }    
    return _getFont(this);
  }

  /**Returns the text if bold or parse up hierarchy */
  getFontBold() {
    function _getFontBold(item:EmailItem) {
        if (item._data.fontBold !=undefined && item._data.fontBold!=null){
          return item._data.fontBold;
        } 
        if (item.parent)
          return _getFontBold(item.parent)
    }    
    return _getFontBold(this);
  }  

  /**Returns the text if underline or parse up hierarchy */
  getFontUnderline() {
    function _getFontUnderline(item:EmailItem) {
        if (item._data.fontUnderline !=undefined && item._data.fontUnderline!=null){
          return item._data.fontUnderline;
        } 
        if (item.parent)
          return _getFontUnderline(item.parent)
    }    
    return _getFontUnderline(this);
  }  

  /**Returns the text if italic or parse up hierarchy */
  getFontItalic() {
    function _getFontItalic(item:EmailItem) {
        if (item._data.fontItalic !=undefined && item._data.fontItalic!=null){
          return item._data.fontItalic;
        } 
        if (item.parent)
          return _getFontItalic(item.parent)
    }    
    return _getFontItalic(this);
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

  /**Removes item from array */
  removeItem(item:EmailItem) {
    if (item && item.parent) {
        item.parent.children = item.parent.children.filter(obj=> obj._data.id != item._data.id);
    }
  }

  /**Moves item up in the position */
  moveUp(item:EmailItem) {
    if (item.parent) {
      let myIndex = item.parent.children.findIndex(obj=> obj._data.id == item._data.id);
      if (myIndex>0) {
        let myElem = item.parent.children[myIndex];
        let myPrevElem = item.parent.children[myIndex-1];
        if (myElem && myPrevElem) {
          let tmp = myElem._data.position;
          myElem._data.position = myPrevElem._data.position;
          myPrevElem._data.position = tmp;
        }
      } 
    }
  }

  /**Moves item down in the position */
  moveDown(item:EmailItem) {
    if (item.parent) {
      let myIndex = item.parent.children.findIndex(obj=> obj._data.id == item._data.id);
      if (myIndex < item.parent.children.length) {
        let myElem = item.parent.children[myIndex];
        let myNextElem = item.parent.children[myIndex+1];
        if (myElem && myNextElem) {
          let tmp = myElem._data.position;
          myElem._data.position = myNextElem._data.position;
          myNextElem._data.position = tmp;
        }
      } 
    }
  }


  /**Adds child to element by keeping parents... correct */
  addChild(child:IEmailItem,parent?:EmailItem) {
    if (!parent) parent = this;
    let myChild = new EmailItem(child);
    parent._data.childs.push(myChild._data);
    parent.children.push(myChild)
    myChild.parent = parent;
    myChild.setId();
    myChild.setPosition();
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
