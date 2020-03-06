import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { IUser, User } from '../../main/models/user';
import { Alert } from '../../main/models/alert';


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

    constructor() {}

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
    addBlock(block:EmailBlock) {
      block.index = this.blocks.length;
      this.blocks.push(block)
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
  createBlock(block: EmailBlock) {
    this.data.addBlock(block);
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
