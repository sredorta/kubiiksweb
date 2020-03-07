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


//Enumerators
export enum EItemType {
  CONTAINER = "container",
  BLOCK = "block",
  CELL = "cell",
  ITEM = "item",
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
  /**Unique identifier of the element */
  id:number;

  /**Parent identifier */
  parentId:number;

  /**Position of the element */
  position:number;

  /**Email item type : container,block,cell... */
  type: EItemType;

  /**Width property */
  width:string;

  /**Background color */
  bgColor:string;

  /**Text color */
  txtColor:string;

  /**Font to use for the element */
  font:string;

  /**Font size to use for the element */
  fontSize:string;

  /**Font type to use for the element: bold, italyc... */
  fontStyle: EFontType;

  /**Children elements */
  childs : EmailItem[];
}

export class EmailItem {
  private _data: IEmailItem;
  isActive : boolean = false;


  constructor(obj?:IEmailItem) {
    if (obj)
      this._data=obj;
    else 
      this._initEmptyTemplate();  
  }


  /**Creates new template empty */
  private _initEmptyTemplate() {
    this._data = {
      id:0,
      parentId:0,
      font:"Test font",
      fontSize:"14px",
      fontStyle: EFontType.NORMAL,
      bgColor:"white",
      txtColor:"black",
      position:1,
      width:"600px",
      type: EItemType.CONTAINER,
      childs: []
    };
  }

  /**Returns list of ETemTypes */
  public getAllItemTypes() {
      return Object.values(EItemType);
  }

  /**Returns list of Block types */
  public getAllBlockTypes() {
    return Object.values(EBlockType);
  } 

  /**Returns if the item is container */
  public isContainer() {
    return this._data.type == EItemType.CONTAINER;
  }


  /**Returns the childs of the element */
  public getChilds() {
    return this._data.childs;
  }


}



@Injectable({
  providedIn: 'root'
})
export class KiiEmailTemplateService {

  //private data: EmailStructure = new EmailStructure();

  constructor() { }



}
