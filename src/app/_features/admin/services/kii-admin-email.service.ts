import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { Email } from '../models/email';


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiAdminEmailService extends KiiBaseAbstract {

  /**Contains current settings loaded */
  private _emails = new BehaviorSubject<Email[]>([]);

  /**Provides setting changements */
  public onChange = new BehaviorSubject<boolean>(true);

  /**When settings are loaded */
  public loaded : boolean = false;


  constructor(
    private http:HttpClient,
    private transfer : TransferState,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

    /**Sets emails */
    set(emails:Email[]) {
      console.log("SETTING ARTICLES",emails);
      this._emails.next(emails);
      if (emails.length>0) {
        this.loaded = true;
        this.onChange.next(!this.onChange.value);
      }
    }

    /**Gets all emails */
    get() {
      return this._emails;
    }

    /**Returns current value of settings */
    value() {
      return this._emails.value;
    }

    /**Load all email templates */
    public load() {
        return this.http.get<Email[]>(environment.apiURL+ '/email/all').pipe(map(res => {
            console.log("Recieved data:",res)
            let result = [];
            for (let elem of res) {
                result.push(new Email(elem))
            }
            return result;
        }))
    }



    /**Updates the element only in memory and triggers onChange */
    /*public refresh(element:Article, notify:boolean=true) {
      let myIndex = this._articles.value.findIndex(obj => obj.id == element.id);
      if (myIndex>=0) {
            this._articles.value[myIndex] = element;
           if (notify) this.onChange.next(!this.onChange.value);
      }
 } */
}