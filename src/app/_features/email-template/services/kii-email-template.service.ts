import { Injectable } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { Subject, BehaviorSubject } from 'rxjs';
import { width } from '@fortawesome/free-solid-svg-icons/faArrowUp';





//Enumerators
export enum EItemType {
  CONTAINER = "container",
  BLOCK = "block",
  CELL = "cell",
  ITEM = "item"
}

export enum EWidgetType {
  TEXT = "text",
  IMAGE = "image",
  BUTTON ="button",
}

export enum EFontType {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE="underline"
}


//Enumerators
export enum EElemType {
  CONTAINER = "container",
  BLOCK = "block",
  CELL = "cell",
  WIDGET = "widget"
}

export enum EBlockType {
  SIMPLE = "simple",
  DOUBLE = "double",
  DOUBLE_2080 = "double_2080",
  DOUBLE_8020 = "double_8020",
  DOUBLE_3070 = "double_3070",
  DOUBLE_7030 = "double_7030",
  TRIPLE = "triple",
  QUAD = "quad"
}

//JSON DATA OF THE EMAIL
export interface IEmailData {
  /**Unique identifier of the element */
  id?:number;

  /**Type of the element: container,block,cell */
  type?: EElemType | string;

  /**Title of the email */
  title?:string;

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

  blocks?: IEmailBlock[];
}

//BLOCK JSON DATA
export interface IEmailBlock {
    /**Unique identifier of the element */
    id?:number;

    /**Type of the element: container,block,cell */
    type?: EElemType | string;

    /**Position of the block */
    position?:number;

    /**Format of block: simple,double... */
    format?: EBlockType | string;
  
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

    /**Cells of the block */
    cells?: IEmailCell[];
}

export interface IEmailCell {
  /**Unique identifier of the element */
  id?:number;

  /**Type of the element: container,block,cell */
  type?: EElemType | string;

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

  /**Padding top */
  paddingTop?:number;

  /**Padding left*/
  paddingLeft?:number;

  /**Padding right */
  paddingRight?:number;

  /**Padding bottom */
  paddingBottom?:number;

  /**Horizontal align: left,right,center */
  hAlign?:string;

  /**Vertical align: top,bottom,center */
  vAlign?:string;

  /**Contains the content of the cell */
  widgets?: IEmailWidget[] | any[];
}

//ITEM ELEMENT HAS ONE WIDGET
export interface IEmailWidget {
  /**Unique identifier of the element */
  id?:number;

  /**Type of the element: container,block,cell */
  type?: EElemType | string;

  /**Position of the block */
  position?:number;

  /**Subtype of the widget: text,button,image */
  format?: EWidgetType | string;

  /**Textarea content in case of text */
  textarea?:string;

  /**URL of the link*/
  url?:string;

  /**URL of the image */
  imageUrl?:string;

  /**Button text */
  txtBtn?:string;

  /**Type of button: link,flat or stroked */
  typeBtn?: 'link' | 'flat' | 'stroked' | 'image_button';

  /**Color of the text of the button */
  colorBtn?:string;

  /**Color of the background of the button */
  bgColorBtn?:string;

  /**Alt text of the image */
  imgAlt?:string;

  /**Image width */
  imgWidth?:number;  
}


@Injectable({
  providedIn: 'root'
})
export class KiiEmailTemplateService {

  private data : IEmailData = {};

  private savedData: IEmailData = null;
  
  /**Selection filter */
  private selectionFilter : EElemType = EElemType.BLOCK;

  public imageRequest : Subject<number> = new Subject<number>();
  public isImageAvailable : Subject<number> = new Subject<number>();

  public image : string = null;

  constructor() { }

  /**Generates new empty template or load existing one */
  initialize(json:IEmailData = null) {
    if (!json) {
      this.data.id = 0;
      this.data.type = EElemType.CONTAINER;
      this.data.bgColor = "white";
      this.data.txtColor = "black";
      this.data.width = "700";
      this.data.font = "Verdana";
      this.data.fontBold =false;
      this.data.fontItalic = false;
      this.data.fontUnderline = false;
      this.data.fontSize = "14px";
      this.data.title = "";
      this.data.blocks = [];
    } else {
      this.data = <IEmailData>JSON.parse(JSON.stringify(json));
    }
  }

  /**Returns the current template json */
  getJson() {
    return this.data;
  }

  /**Returns the current title */
  getTitle() {
    return this.data.title;
  }

  /**Sets email title */
  setTitle(title:string) {
    this.data.title =title;
  }

  /**Returns the container width */
  getContainerWidth() {
    return this.data.width;
  }

  /**Returns list of Block types */
  getAllBlockTypes() {
    return Object.values(EBlockType);
  } 

  /** ¡Returns available font sizes */
  getAllFontSizes() {
    return ['12px','14px','16px','18px','22px','26px','30px','34px'];
  }

  /**Returns all available fonts */
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

  /**Returns all widget types */
  getAllWidgetTypes() {
    return Object.values(EWidgetType);
  }

  /**Returns the tipe of the element */
  getElementType(id:number) {
    return this._findId(id).type;
  }

  _findId(id:number) {
    if (id == 0) return this.data;
    for (let block of this.getBlocks())  {
       if (block.id == id) return block;
       for (let cell of block.cells) {
         if (cell.id == id) return cell;
         for (let widget of this.getWidgets(cell.id)) {
           if (widget.id == id) return widget;
         }
       }
    }
    return this.data;
  }

  _getNextId() {
    let id = 0;
    for (let block of this.data.blocks) {
      if (block.id>id) id = block.id;
      for (let cell of block.cells) {
        if (cell.id>id) id = cell.id;
        for (let widget of cell.widgets) {
          if (widget.id>id) id = widget.id;
        }
      }
    }
    id = id + 1;
    return id;
  }
  _getNextBlockPosition() {
     let position = 0;
     for (let block of this.data.blocks) {
       if (block.position> position) position = block.position;
     }
     position = position+1;
     return position;
  }

  getParent(id:number) {
    if (id == 0) return this.data;
    if (this.data.blocks.findIndex(obj=> obj.id == id)>=0) return this.data;
    else {
      for (let block of this.data.blocks) {
        if (block.cells.findIndex(obj=>obj.id ==id)>=0) return block;
        for (let cell of block.cells) {
          if (cell.widgets.findIndex(obj=>obj.id ==id)>=0) return cell;
        }
      }
    }
  }



  /**Adds a cell to a specific block */
  addCell(blockId:number, width:string) {
    let block = <IEmailBlock>this._findId(blockId);
    if (block.type == EElemType.BLOCK) {
      let cell = {
        id: this._getNextId(),
        type:EElemType.CELL,
        width:width,
        bgColor:null,
        txtColor:null,
        font:null,
        fontSize:null,
        fontBold:null,
        fontItalic:null,
        fontUnderline:null,
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:0,
        hAlign:"left",
        vAlign:"top",
        widgets:[]
      };
      block.cells.push(cell);
    }

  }

  /**Returns the cells of a block */
  getCells(blockId:number) {
    let block = <IEmailBlock>this._findId(blockId);
    return block.cells;
  }


  /**Adds a block to the container */
  addBlock(type: EBlockType) {
    let myId = this._getNextId();
    this.data.blocks.push(
      {
        id: myId,
        type: EElemType.BLOCK,
        position: this._getNextBlockPosition(),
        format: type,
        width:"100%",
        bgColor:null,
        txtColor:null,
        font:null,
        fontSize:null,
        fontBold: null,
        fontItalic: null,
        fontUnderline: null,
        cells: []
      })
      switch (type) {
        case EBlockType.DOUBLE:
          this.addCell(myId,"50%");
          this.addCell(myId,"50%");
          break;
        case EBlockType.DOUBLE_2080:
          this.addCell(myId,"20%");
          this.addCell(myId,"80%");
          break;    
        case EBlockType.DOUBLE_3070:
          this.addCell(myId,"30%");
          this.addCell(myId,"70%");
          break;         
        case EBlockType.DOUBLE_8020:
          this.addCell(myId,"80%");
          this.addCell(myId,"20%");
          break;    
        case EBlockType.DOUBLE_7030:
          this.addCell(myId,"70%");
          this.addCell(myId,"30%");
          break;       
        case EBlockType.TRIPLE:
          this.addCell(myId,"33%");
          this.addCell(myId,"33%");
          this.addCell(myId,"34%");
          break;             
        case EBlockType.QUAD:
          this.addCell(myId,"25%");
          this.addCell(myId,"25%");
          this.addCell(myId,"25%");          
          this.addCell(myId,"25%");
          break;          
        default: 
          this.addCell(myId,"100%");
      }
  }

  /**Returns orderder blocks */
  getBlocks() {
    return this.data.blocks.sort((a,b)=> a.position>b.position?1:-1);
  }

  /**Adds widget to a cell */
  addWidget(cellId:number,type:EWidgetType) {
    let cell = <IEmailCell>this._findId(cellId);
    
    function getNextPosition(cell) {
      let position=0;
      for (let widget of cell.widgets) {
        if (widget.position>position) position=widget.position;
      }
      position =position+1;
      return position;
    }

    if (cell.type == EElemType.CELL) {
      let widget: IEmailWidget = {
        id: this._getNextId(),
        position:getNextPosition(cell),
        type:EElemType.WIDGET,
        format: type,
        textarea:"Text",
        url:"",
        imageUrl:"",
        txtBtn:"Text",
        typeBtn: 'link',
        colorBtn:"red",
        bgColorBtn:"blue",
        imgAlt:"Alt text",
        imgWidth:600
      };
      cell.widgets.push(widget);
    }
  }

  /**Returns widgets ordered by position */
  getWidgets(cellId:number) {
    let elem = this._findId(cellId);
    return elem.widgets.sort((a,b)=> a.position>b.position?1:-1);
  }


  /**Sets selection type */
  setSelectionFilter(type: EElemType) {
    this.selectionFilter = type;
  }

  /**Returns current selection filter */
  getSelectionFilter() {
    return this.selectionFilter;
  }

  /**Removes element */
  remove(id:number) {
    let item = this._findId(id);
    let parent = this.getParent(item.id);
    if (parent.type == EElemType.CONTAINER) {
      let container = <IEmailData>parent;
      let index = container.blocks.findIndex(obj=>obj.id ==id);
      if (index>=0) container.blocks.splice(index,1);
    }
    //Widgets
    if (parent.type == EElemType.CELL) {
      let cell = <IEmailCell>parent;
      let index = cell.widgets.findIndex(obj=> obj.id == id);
      if (index>=0) cell.widgets.splice(index,1);
    }
    this.data = {...this.data};
  }

  /**Moves item up */
  moveUp(id:number) {
    let item = this._findId(id);
    let parent = this.getParent(item.id);
    if (parent.type == EElemType.CONTAINER) {
      let container = <IEmailData>parent;
      let currIndex = container.blocks.findIndex(obj=> obj.position == item.position);
      let prevIndex = container.blocks.findIndex(obj=> obj.position == item.position-1);
        if (prevIndex>=0 && currIndex>=0) {
           let tmp = container.blocks[prevIndex].position;
           container.blocks[prevIndex].position = container.blocks[currIndex].position;
           container.blocks[currIndex].position = tmp;
        }
    }
    if (parent.type == EElemType.CELL) {
      let cell = <IEmailCell>parent;
      let currIndex = cell.widgets.findIndex(obj=> obj.position == item.position);
      let prevIndex = cell.widgets.findIndex(obj=> obj.position == item.position-1);
        if (prevIndex>=0 && currIndex>=0) {
          let tmp = cell.widgets[prevIndex].position;
          cell.widgets[prevIndex].position = cell.widgets[currIndex].position;
          cell.widgets[currIndex].position = tmp;
        }
    }
  }

  /**Moves item down */
  moveDown(id:number) {
    let item = this._findId(id);
    let parent = this.getParent(item.id);
    if (parent.type == EElemType.CONTAINER) {
      let container = <IEmailData>parent;
      let currIndex = container.blocks.findIndex(obj=> obj.position == item.position);
      let nextIndex = container.blocks.findIndex(obj=> obj.position == item.position+1);
        if (nextIndex>=0 && currIndex>=0) {
           let tmp = container.blocks[currIndex].position;
           container.blocks[currIndex].position = container.blocks[nextIndex].position;
           container.blocks[nextIndex].position = tmp;
        }
    }
    if (parent.type == EElemType.CELL) {
      let cell = <IEmailCell>parent;
      let currIndex = cell.widgets.findIndex(obj=> obj.position == item.position);
      let nextIndex = cell.widgets.findIndex(obj=> obj.position == item.position+1);
        if (nextIndex>=0 && currIndex>=0) {
          let tmp = cell.widgets[currIndex].position;
          cell.widgets[currIndex].position = cell.widgets[nextIndex].position;
          cell.widgets[nextIndex].position = tmp;
        }
    }
  }


  /**Returns property if defined or traces up until defined */
  getPropertyValue(id:number, property:string) {
    let elem = this._findId(id);
    if (!elem) console.error("Element not found",id);
    if(!(elem[property]==null) && !(elem[property]==undefined)) {
      return elem[property];
    } else {
      let result = null;
      let myId = elem.id;
      while (result == null) {
        let parent = this.getParent(myId);
        if (parent[property]!=null && parent[property]!=undefined){
          return parent[property];
        }
        myId = parent.id;
      }
    }
  }

  /**Returns if item isBold */
  isBold(id:number) {
    return this.getPropertyValue(id,'fontBold');
  }

  /**Returns if item is Italic */
  isItalic(id:number) {
    return this.getPropertyValue(id,'fontItalic');
  }

  /**Returns if item is underline */
  isUnderline(id:number) {
    return this.getPropertyValue(id,'fontUnderline');
  }

  /**Returns horizontal alignment */
  getAlignHorizontal(id:number) {
    let elem = this._findId(id);
    if(!(elem['hAlign']==null) && !(elem['hAlign']==undefined))
      return elem['hAlign'];
    else 
      return 'left';
  }

  /**Returns vertical alignment */
  getAlignVertical(id:number) {
    let elem = this._findId(id);
    if(!(elem['vAlign']==null) && !(elem['vAlign']==undefined))
      return elem['vAlign'];
    else 
      return 'top';
  }

  /**Returns the padding of element */
  getPadding(id:number, side: 'left' | 'right' |'top'|'bottom') {
    let elem = this._findId(id);
    switch (side) {
      case 'left': return elem.paddingLeft;
      case 'right': return elem.paddingRight;
      case 'top': return elem.paddingTop;
      case 'bottom': return elem.paddingBottom;
      default: return 0;
    }
  }

  /**Returns padding in px format string */
  getPaddingPx(id:number, side: 'left' | 'right' |'top'|'bottom') {
    return this.getPadding(id,side) + 'px';
  }

  /**Saves data to apply to other template */
  saveData() {
    this.savedData = <IEmailData>JSON.parse(JSON.stringify(this.data));
  }

  /**Restores data saved */
  restoreData() {
    let value = this.savedData;
    this.savedData = null;
    this.data = value;
  }

  /**Checks if it has saved data */
  hasSavedData() {
    if (this.savedData == null) return false;
    return true;
  }
}
