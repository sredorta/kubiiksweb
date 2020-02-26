import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Setting, ISetting } from '../models/setting';
import { IUser, User } from '../models/user';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { KiiMainUserService } from './kii-main-user.service';
import { Page } from '../models/page';


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiMainPageService extends KiiBaseAbstract {

  /**Contains current settings loaded */
  private _pages = new BehaviorSubject<Page[]>([]);

  /**Provides setting changements */
  public onChange = new BehaviorSubject<boolean>(true);

  /**When settings are loaded */
  public loaded : boolean = false;


  constructor(
    private http:HttpClient,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

    /**Sets settings */
    set(pages:Page[]) {
      //console.log("SETTING PAGES TO:",pages);
      this._pages.next(pages);
      if (pages.length>0) {
        this.loaded = true;
        this.onChange.next(!this.onChange.value);
      }
    }

    /**Gets all settings */
    get() {
      return this._pages;
    }

    /**Returns current value of settings */
    value() {
      return this._pages.value;
    }

    /**Checks if page is loaded */
    hasPage(page_name:string) {
      let page = this._pages.value.find(obj => obj.page == page_name);
      if (!page) return false;
      return true;
    }


    /**Returns a setting filtered by key */
    public getByKey(name:string) {
      if (this._pages.value.length<=0) {
        return new Page(null);
      }
      let page = this._pages.value.find(obj => obj.page == name);
      if (!page) return new Page(null);
      return page;
    }  

    /**Updates the element only in memory and triggers onChange */
    public refresh(element:Page, notify:boolean=true) {
         let myIndex = this._pages.value.findIndex(obj => obj.id == element.id);
         if (myIndex>=0) {
               this._pages.value[myIndex] = element;
              if (notify) this.onChange.next(!this.onChange.value);
         }
    }    
}