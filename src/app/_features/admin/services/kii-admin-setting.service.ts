import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { Setting } from '../../main/models/setting';


//This service contains all general data required per page

@Injectable({
  providedIn: 'root'
})
export class KiiAdminSettingService extends KiiBaseAbstract {



  constructor(
    private http:HttpClient,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

  
  /**Update setting in database : kubiiks rights required*/
  public update(element:Setting) {
    return this.http.post<Setting>(environment.apiURL + '/setting/update', {setting: element}).pipe(map(res => new Setting(res)));
  }   

  /**Update setting for dialog in database: content rights required*/
  public updateDialog(element:Setting) {
      return this.http.post<Setting>(environment.apiURL + '/setting/update-dialog', {setting: element}).pipe(map(res => new Setting(res)));
  }   

}