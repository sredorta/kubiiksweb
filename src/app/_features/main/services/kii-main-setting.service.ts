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


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiMainSettingService extends KiiBaseAbstract {

  /**Contains current settings loaded */
  private _settings = new BehaviorSubject<Setting[]>([]);

  /**Provides setting changements */
  public onChange = new BehaviorSubject<boolean>(true);

  /**When settings are loaded */
  public loaded : boolean = false;


  constructor(
    private http:HttpClient,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

    /**Sets settings */
    setSettings(settings:Setting[]) {
      this._settings.next(settings);
      if (settings.length>0) {
        this.loaded = true;
        this.onChange.next(!this.onChange.value);
      }
    }

    /**Gets all settings */
    getSettings() {
      return this._settings;
    }

    /**Returns current value of settings */
    getValue() {
      return this._settings.value;
    }


    /**Returns a setting filtered by key */
    public getByKey(key:string) {
      if (this._settings.value.length<=0) {
        return new Setting(null);
      }
      let setting = this._settings.value.find(obj => obj.key == key);
      if (!setting) return new Setting(null);
      return setting;
    }  

}