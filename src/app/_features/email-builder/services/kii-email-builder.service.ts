import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { IUser, User } from '../../main/models/user';
import { Alert } from '../../main/models/alert';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';


//Contexts for the common toolbar
export enum EContextTypes {
  BODY = "body",
  BLOCK = "block",
  CELL = "cell",
  ITEM = "item",
}




//Define items
export enum EItemTypes {
  H1 = "h1",
  TEXT = "text",
  IMAGE = "image",
}
export interface IEmailItem {
  type: EItemTypes;
  isActive:boolean;
  index:number;
  bgColor:string;
  txtColor:string;
}

export class EmailItem {
  id : number;
  className:string ="EmailItem";
  parent:EmailCell;

  type: EItemTypes = EItemTypes.TEXT;
  isActive : boolean = false;
  index:number;

  /**Background color */
  bgColor:string = null;

  /**Text color */
  txtColor: string = null;  

  constructor(id:number,type:EItemTypes,parent:EmailCell) {
    this.id=id;
    this.type = type;
    this.parent = parent;
  }
  /**Returns list of BlockTypes */
  public static getAllItemTypes() {
      return [EItemTypes.H1,EItemTypes.TEXT,EItemTypes.IMAGE];
  }

  public static getIcon(type:EItemTypes) {
    switch(type) {
      case EItemTypes.IMAGE:
        return faImage;
      case EItemTypes.TEXT:
        return faParagraph
      case EItemTypes.H1:
        return faHeading;
    }
  }

  /**Returns if there is a sibling active */
  hasSblingActive() {
    let active = this.parent.items.find(obj=>obj.isActive == true);
    if (active) return true;
    return false;
  }

}

//Define cells
export interface IEmailCell {
  index:number;
  isActive:boolean;
  bgColor:string;
  txtColor:string;
  items: EmailItem[];
}
export class EmailCell {
  id:number;
  className:string ="EmailCell";
  parent:EmailBlock;

  index:number;
  isActive:boolean = false;

  /**Background color */
  bgColor:string = null;

  /**Text color */
  txtColor: string = null;

  /**Contains all items of a cell */
  items: EmailItem[] = [];

  constructor(id:number,index:number, parent: EmailBlock) {
    this.id =id;
    this.index = index;
    this.parent = parent;
  }

  /**Returns if there is a sibling active */
  hasSblingActive() {
      let active = this.parent.cells.find(obj=>obj.isActive == true);
      if (active) return true;
      return false;
  }

}

//Define blocks
export enum EBlockTypes {
  SIMPLE = "simple",
  DOUBLE = "double",
  DOUBLE_LEFT = "double_left",
  DOUBLE_RIGHT = "double_right",
  TRIPLE = "triple"
}
export interface IEmailBlock {
  isLocked:boolean;
  type: EBlockTypes;
  index:number;
  bgColor:string;
  txtColor:string;
  cells: EmailCell[];
}
export class EmailBlock {
    id:number;
    className:string ="EmailBlock";
    parent: EmailStructure;

    /**If this Block can be edited */
    isLocked : boolean = false;
    /**Type of the block :simple,double...*/
    type: EBlockTypes = EBlockTypes.SIMPLE;

    /**Contains the position of the block in the structure */
    index: number;

    /**Contains if the block is selected */
    isActive:boolean = false;

    /**Background color */
    bgColor:string = null;
  
    /**Text color */
    txtColor: string = null;


    cells: EmailCell[] = [];

    constructor(id:number,type:EBlockTypes,parent:EmailStructure) {
      this.id = id;
      this.type = type;
      this.parent = parent;
    }

    /**Returns list of BlockTypes */
    public static getAllBlockTypes() {
      return [EBlockTypes.SIMPLE,EBlockTypes.DOUBLE,EBlockTypes.DOUBLE_LEFT,EBlockTypes.DOUBLE_RIGHT,EBlockTypes.TRIPLE];
    }
}

export class EmailStructure {
    private id:number = 0;
    isActive:boolean=true;
    className:string="EmailStructure";
    parent : EmailStructure = null;

    /**Contains all the blocks of the email */ 
    blocks: EmailBlock[] = [];
    bgColor: string = "white";
    txtColor: string = "black";
    
    constructor() {}

    /**Adds a block to the bottom */
    addBlock(type:EBlockTypes) {
      let index = this.blocks.length;
      this.id= this.id+1;
      let myBlock = new EmailBlock(this.id, type,this);
      switch (type) {
        case EBlockTypes.SIMPLE: {
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,0,myBlock));
          break;
        }
        case EBlockTypes.TRIPLE:
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,0,myBlock));
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,1,myBlock));
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,2,myBlock));
          break;
        default:
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,0,myBlock));
          this.id = this.id+1;
          myBlock.cells.push(new EmailCell(this.id,1,myBlock));
      }

      myBlock.index =index;
      this.blocks.push(myBlock)
    }

    /**Adds item to selected cell */
    addItem(type:EItemTypes) {
      console.log("Adding item with type",type);
        let cell = this.getSelectedCell();
        console.log("Selected cell:",cell);
        if (cell) {
          this.id = this.id+1;
          cell.items.push(new EmailItem(this.id,type,cell));
        }
    }


    /**Returns the selected block if any*/
    public getSelectedBlock() {
      let block = this.blocks.find(obj=>obj.isActive==true);
      if (block)
        return block;
      return null;  
    }

    /**Returns the selected cell */
    public getSelectedCell() {
      for (let block of this.blocks) {
        let cell = block.cells.find(obj=>obj.isActive == true);
        if (cell) return cell;
      }
      return null;
    }

    /**REturns the selected item */
    public getSelectedItem() {
      for (let block of this.blocks) {
        for (let cell of block.cells) {
          let item = cell.items.find(obj=>obj.isActive == true);
          if (item) return item;
        }
      }
      return null;
    }

    /**Gets the background color of an element if defined */
    getBgColor(element:any) {
      if (element.bgColor) return element.bgColor;
      return "transparent";
    }

    /**Gets the text color of an element if defined */
    getTxtColor(element:any) {
      if (element.txtColor) return element.txtColor;
      return this.txtColor;
    }
}


@Injectable({
  providedIn: 'root'
})
export class KiiEmailBuilderService {

  private data: EmailStructure = new EmailStructure();

  public onChange : Subject<EmailStructure> = new Subject<EmailStructure>();

  constructor() { }

  getJson() {
    return this.data;
  }

  /**Creates a new block */
  createBlock(type: EBlockTypes) {
    this.data.addBlock(type);
    this.onChange.next(this.data);
  }

  /**Creates a new item on a selected cell */
  createItem(type: EItemTypes) {
    this.data.addItem(type);
    this.onChange.next(this.data);
  }

  /**Sets the background color of the element */
  setBackgroundColor(id:number,color:string) {
    let elem = this.data.getSelectedItem();
    if (elem) {
      elem.bgColor = color;
      console.log("Setting background for id",id,color);
      this.onChange.next(this.data);
    }
  }

  /**Sets the text color of the element */
  setColor(id: number,color:string) {
    let elem = this.data.getSelectedItem();
    if (elem) {
      elem.txtColor = color;
      console.log("Setting color for id",id,color);
      this.onChange.next(this.data);
    }
  }

  /**Gets element by id */
  getElementById(id:number) {
    let elem = this.data.blocks.find(obj=>obj.id == id);
    if (elem) {
      return elem;
    }
    for (let block of this.data.blocks) {
        let cell = block.cells.find(obj=> obj.id == id);
        if (cell) {
          return cell;
        }
    }
    for (let block of this.data.blocks) {
      for (let cell of block.cells) {
        let item = cell.items.find(obj=> obj.id == id);
        if (item) {
          return item;
        }
      }
    }
  }


  /**Selects the element depending on the context */
  setActiveElement(id:number) {
    let elem = this.getElementById(id);
    if (!elem) return;
    this.removeActiveElement();
    elem.isActive = true;
  }

  /**Removes any active element */
  removeActiveElement() {
      for (let block of this.data.blocks) {
        block.isActive = false;
        for (let cell of block.cells) {
          cell.isActive = false;
          for (let item of cell.items) {
            item.isActive = false;
          }
        }
      }
  }

  getBackgroundColor(element:EmailBlock | EmailCell |EmailItem) {
    console.log("ELEMENT",element);
      if (!element) return this.data.bgColor;
      if (element.bgColor) return element.bgColor;
      if (element.parent && element.parent.bgColor) return element.parent.bgColor;
      let elem = element.parent;
      if (elem && elem.parent && elem.parent.bgColor) return elem.parent.bgColor;
  }

  getTxtColor(element:EmailBlock | EmailCell |EmailItem) {
    if (!element) return this.data.txtColor;
    if (element.txtColor) return element.txtColor;
    if (element.parent && element.parent.txtColor) return element.parent.txtColor;
    let elem = element.parent;
    if (elem && elem.parent && elem.parent.txtColor) return elem.parent.txtColor;

  } 


}
