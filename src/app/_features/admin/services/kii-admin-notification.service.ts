import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { Onpush } from '../models/onpush';


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiAdminNotificationService extends KiiBaseAbstract {

  /**Contains current settings loaded */
  private _notifications = new BehaviorSubject<Onpush[]>([]);

  /**Provides setting changements */
  public onChange = new BehaviorSubject<boolean>(true);

  /**When settings are loaded */
  public loaded : boolean = false;


  constructor(
    private http:HttpClient,
    private transfer : TransferState,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

    /**Sets notifications */
    set(notifications:Onpush[]) {
      this._notifications.next(notifications);
      if (notifications.length>0) {
        this.loaded = true;
        this.onChange.next(!this.onChange.value);
      }
    }

    /**Gets all notifications */
    get() {
      return this._notifications;
    }

    /**Returns current value of notifications */
    value() {
      return this._notifications.value;
    }

    /**Load all notification templates */
    public load() {
        return this.http.get<Onpush[]>(environment.apiURL+ '/notification/all').pipe(map(res => {
            let result = [];
            for (let elem of res) {
                result.push(new Onpush(elem))
            }
            return result;
        }))
    }

    /**Updates current notification */
    public update(notification:Onpush) {
      return this.http.post<Onpush>(environment.apiURL + '/notification/update', {notification: notification}).pipe(map(res => new Onpush(res)));
    }

    /**Creates a new notification template */
    public create(data:any) {
      return this.http.post<Onpush>(environment.apiURL  + '/notification/create', data).pipe(map(res => new Onpush(res)));
    }  


    /**Adds an element at the begining of the array in memory and triggers onChange*/
    public addUnshift(element: Onpush) {
      this._notifications.value.unshift(element);
      this._notifications.next(this._notifications.value);
      this.onChange.next(true);
    }

    /**Deletes element in database*/
    public delete(element:Onpush) {
      return this.http.post<any>(environment.apiURL + '/notification/delete', {id:element.id});
    }

    /**Removes element from memory and triggers onChange*/
    public splice(element:Onpush) {
      let index = this._notifications.value.findIndex(obj => <any>obj.id == <unknown><any>element.id);
      if (index>=0) {
          this._notifications.value.splice(index,1);
          this._notifications.next(this._notifications.value);
          this.onChange.next(true);
      }
    }


    /**Sends notification to required recipients */
    public send(element:Onpush, options:any) {
      return this.http.post<any>(environment.apiURL + '/notification/send',{notification:element, options:options});
    }


}