import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class KiiMainNetworkService {

  offline :BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(@Inject(PLATFORM_ID) private platform: any) { 
    console.log("INIT OF NETWORK SERVICE !!!!")
    if (isPlatformBrowser(this.platform)) {
      window.ononline = (event) => {
        console.log("online",event.type);
          this.offline.next(false);
      };
      window.onoffline = (event) => {
        console.log("offline",event.type);
        this.offline.next(true);
      };
    }

  }


}