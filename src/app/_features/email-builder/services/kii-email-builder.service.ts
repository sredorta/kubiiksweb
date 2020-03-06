import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { IUser, User } from '../../main/models/user';
import { Alert } from '../../main/models/alert';




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
  constructor() {}
  /**Returns list of BlockTypes */
  public static getAllItemTypes() {
      return [EItemTypes.TEXT,EItemTypes.IMAGE];
  }
}

//Define cells
export interface IEmailCell {
  index:number;
}
export class EmailCell {
  index:number;
  isActive:boolean = false;
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

  /**Sets block as active */
  setActiveBlock(index: number) {
    console.log("Setting active block",index);
    for (let block of this.data.blocks) {
      block.isActive = false;
      if (block.index == index) block.isActive = true;
    }
    this.onChange.next(this.data);

  }

}
