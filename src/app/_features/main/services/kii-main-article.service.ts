import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IUser, User } from '../models/user';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { KiiMainUserService } from './kii-main-user.service';
import { Article, IArticle } from '../models/article';


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiMainArticleService extends KiiBaseAbstract {

  /**Contains current settings loaded */
  private _articles = new BehaviorSubject<Article[]>([]);

  /**Provides setting changements */
  public onChange = new BehaviorSubject<boolean>(true);

  /**When settings are loaded */
  public loaded : boolean = false;


  constructor(
    private http:HttpClient,
    private transfer : TransferState,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

    /**Sets settings */
    set(articles:Article[]) {
      this._articles.next(articles);
      if (articles.length>0) {
        this.loaded = true;
        this.onChange.next(!this.onChange.value);
      }
    }

    /**Gets all settings */
    get() {
      return this._articles;
    }

    /**Returns current value of settings */
    value() {
      return this._articles.value;
    }


    /**Returns a setting filtered by key */
    public getByKey(key:string) {
      if (this._articles.value.length<=0) {
        return new Article(null);
      }
      let article = this._articles.value.find(obj => obj.key == key);
      if (!article) return new Article(null);
      return article;
    }  

    public getById(id:number) {
      let article = this._articles.value.find(obj => obj.id == id);
      if (!article) return new Article(null);
      return article;
    }

    /**Returns all articles from a cathegory */
    public getByCathegory(cathegory:string) {
      if (this._articles.value.length<=0) {
        return [];
      }
      return this._articles.value.filter(obj => obj.cathegory == cathegory && obj.public ==true).sort((a,b)=>a.order-b.order);;
    }

    /**Updates the element only in memory and triggers onChange */
    public refresh(element:Article, notify:boolean=true) {
      let myIndex = this._articles.value.findIndex(obj => obj.id == element.id);
      if (myIndex>=0) {
            this._articles.value[myIndex] = element;
           if (notify) this.onChange.next(!this.onChange.value);
      }
 } 
}