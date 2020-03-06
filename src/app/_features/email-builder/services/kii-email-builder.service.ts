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




//Define items
export enum EItemTypes {
  IMAGE = "image",
  TEXT = "text"
}
export interface IEmailItem {
  type: EItemTypes;
  index:number;
}

export class EmailItem {
  type: EItemTypes = EItemTypes.TEXT;
  index:number;
  constructor(type:EItemTypes) {
    this.type = type;
  }
  /**Returns list of BlockTypes */
  public static getAllItemTypes() {
      return [EItemTypes.TEXT,EItemTypes.IMAGE];
  }

  public static getIcon(type:EItemTypes) {
    switch(type) {
      case EItemTypes.IMAGE:
        return faImage;
      case EItemTypes.TEXT:
        return faParagraph
    }
  }

}

//Define cells
export interface IEmailCell {
  index:number;
}
export class EmailCell {
  index:number;
  isActive:boolean = false;

  /**Contains all items of a cell */
  items: EmailItem[] = [];

  constructor(index:number) {
    this.index = index;
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
}
export class EmailBlock {
    /**If this Block can be edited */
    isLocked : boolean = false;
    /**Type of the block :simple,double...*/
    type: EBlockTypes = EBlockTypes.SIMPLE;

    /**Contains the position of the block in the structure */
    index: number;

    /**Contains if the block is selected */
    isActive:boolean = false;

    cells: EmailCell[] = [];

    constructor(type:EBlockTypes) {
      this.type = type;
      switch (type) {
        case EBlockTypes.SIMPLE: {
          this.cells.push(new EmailCell(0));
          break;
        }
        case EBlockTypes.TRIPLE:
          this.cells.push(new EmailCell(0));
          this.cells.push(new EmailCell(1));
          this.cells.push(new EmailCell(2));
          break;
        default:
          this.cells.push(new EmailCell(0));
          this.cells.push(new EmailCell(1));
      }
    }

    /**Returns list of BlockTypes */
    public static getAllBlockTypes() {
      return [EBlockTypes.SIMPLE,EBlockTypes.DOUBLE,EBlockTypes.DOUBLE_LEFT,EBlockTypes.DOUBLE_RIGHT,EBlockTypes.TRIPLE];
   }
}

export class EmailStructure {
    /**Contains all the blocks of the email */ 
    blocks: EmailBlock[] = [];
    
    constructor() {}

    /**Adds a block to the bottom */
    addBlock(type:EBlockTypes) {
      let index = this.blocks.length;
      let myBlock = new EmailBlock(type);
      myBlock.index =index;
      this.blocks.push(myBlock)
    }

    /**Adds item to selected cell */
    addItem(type:EItemTypes) {
        let cell = this.getSelectedCell();
        if (cell) {
          cell.items.push(new EmailItem(type));
        }
    }

    /**Returns the selected block */
    public getSelectedBlock() {
      let block = this.blocks.find(obj=>obj.isActive==true);
      if (block)
        return block;
      return null;  
    }

    /**Returns the selected cell */
    public getSelectedCell() {
      let block = this.getSelectedBlock();
      if (block) {
        let cell = block.cells.find(obj=>obj.isActive == true);
        if (cell) return cell;
      }
      return null;
    }

}


@Injectable({
  providedIn: 'root'
})
export class KiiEmailBuilderService {

  private data: EmailStructure = new EmailStructure();

  public onChange : Subject<any> = new Subject<any>();

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

  /**Sets block as active */
  setActiveBlock(index: number) {
    console.log("Setting active block",index);
    for (let block of this.data.blocks) {
      block.isActive = false;
      if (block.index == index) block.isActive = true;
    }
    this.onChange.next(this.data);
  }

  /**Sets active cell of a block */
  setActiveCell(index:number) {
    console.log("Setting active cell",index);
    //Set all cells to inactive
    this.removeActiveCell();
    //Set active cell
    let block = this.data.getSelectedBlock();
    if (block) {
      let cell = block.cells.find(obj=>obj.index == index);
      if (cell) cell.isActive = true;
    }
    this.onChange.next(this.data);
  }

  /**Removes any active block cell */
  removeActiveCell() {
    for (let block of this.data.blocks) {
      for (let cell of block.cells) {
        cell.isActive = false;
      }
    }
  }
  /**Removes any active block and cell*/
  removeActiveBlock() {
    for (let block of this.data.blocks) {
      block.isActive = false;
    }
    this.removeActiveCell();
  }

}
