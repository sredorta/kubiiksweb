import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Setting, ISetting } from '../models/setting';
import { IUser, User } from '../models/user';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { KiiMainUserService } from './kii-main-user.service';
import { KiiMainSettingService } from './kii-main-setting.service';


//This service loads the initial page data from transfer state or from http
//Sets the settings and the user

/**Internal interface */
interface _IInitialData  {
  settings: ISetting[],
  user: IUser
}

/**Initial Data  */
interface IInitialData  {
  settings: Setting[],
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class KiiMainDataService extends KiiBaseAbstract {


  constructor(
    private http:HttpClient,
    private transfer : TransferState,
    private user: KiiMainUserService,
    private setting: KiiMainSettingService,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

  /**Loads the initial data and handles state transfer to avoid double http calls */
  public loadInitialData() : void {
    console.log("LOAD INITIAL DATA !");
    const key: StateKey<_IInitialData> = makeStateKey<_IInitialData>('transfer-intial');
    //RESTORE FROM TRANSFER STATE
    //When restoring from state transfer the user is unknown so we need to load the user appart
    let myData = null;
    if (isPlatformBrowser(this._platformId)) {
      myData = this.transfer.get(key, null);
      if (myData) {
        this._update(myData);
        console.log("RESTORED FROM TRANSFER STATE", myData);
        if (User.hasToken()) 
            this.addSubscriber(
              this.user.getAuthUser().subscribe(res => {
                  console.log("WE ASKED AUTH USER AGAIN !!!",res);
                  this.user.setLoggedInUser(new User(res));
              })
            )
      } 
    }
    //DO HTTP CALL IF NOT RESTORED
    if (!myData) {
      this.addSubscriber(
        this.http.get<_IInitialData>(environment.apiURL + '/initial').subscribe(res => {
          if (isPlatformServer(this._platformId)) {
            this.transfer.set(key, res);
          }
          this._update(res);
        })
      )
    }
  }

  private _update(data:_IInitialData) {
    let settings : Setting[] = [];
    for (let setting of data.settings) {
      settings.push(new Setting(setting));
    }
    this.setting.setSettings(settings);
    this.user.setLoggedInUser(new User(data.user));
  }





}