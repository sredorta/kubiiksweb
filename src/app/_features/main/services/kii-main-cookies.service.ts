import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KiiMainCookiesService {


  /**Determines if cookies bottomsheet needs to be displayed */
  showCookies = new BehaviorSubject<boolean>(false);


  constructor(@Inject(PLATFORM_ID) private platform: any) {
    if (isPlatformBrowser(this.platform))
      if (!this.areAccepted()) this.showCookies.next(true);
  }


  public areAccepted() {
    if (isPlatformBrowser(this.platform))
      if (localStorage.getItem("cookies") == "accepted") {
          //Check validity of cookies
          if (!localStorage.getItem("cookies-date")) return false;
          const date = Number.parseInt(localStorage.getItem("cookies-date"));
          const now = new Date().getTime();
          if ((now - date)>15552000000)  return false; //1000*60*60*24*180 = 6 months
          return true;
      }
    return false;
  }  

  /**Accept cookies */
  public accept() {
    if (isPlatformBrowser(this.platform)) {
        localStorage.setItem('cookies','accepted');
        localStorage.setItem('cookies-date', new Date().getTime().toString())
        this.showCookies.next(false);
    }
  }

  /**Refuse cookies */
  public refuse() {
      if (isPlatformBrowser(this.platform)) {
        localStorage.clear();
        this.showCookies.next(false);
      }
  }


}