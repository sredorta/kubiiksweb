import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { KiiMainCookiesService } from './kii-main-cookies.service';
import { StatAction, Stat } from '../models/stat';


@Injectable({
  providedIn: 'root'
})
export class KiiMainStatsService {

  constructor(
    private http:HttpClient, 
    private kiiCookies: KiiMainCookiesService
    ) { }


  /**Gets session id creating one if doesn't exist */
  private getSessionId() {
    if (sessionStorage.getItem("stats.session")) {
      return sessionStorage.getItem("stats.session");
    } else {
      let number = Math.random();
      number.toString(36); 
      let id = number.toString(36).substr(2, 9);
      id = id + new Date().getTime();
      sessionStorage.setItem("stats.session", id); 
      return id;     
    }
  }

  /**Returns if user has a stats sessionId */
  private hasSessionId() {
    if (sessionStorage.getItem("stats.session")) {
      return true;
    }
    return false;
  }    

  /**Clears current sessionId of the stats */
  public clearSession() {
      if (this.kiiCookies.areAccepted())
        sessionStorage.removeItem("stats.session");
  }

  /**Send stats to the server */
  public send(action: StatAction, ressource:string) {
    if (this.kiiCookies.areAccepted()) {
      let myStat = new Stat(null);
      //If there is no sessionId we need to create an extra APP_START event
      if (!this.hasSessionId()) {
        myStat.session = this.getSessionId();
        myStat.ressource = document.referrer;
        myStat.action = StatAction.APP_START;
        this.http.post(environment.apiURL + '/stats/save', {stat:myStat}).subscribe();
        /*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            console.log("Found coords !!!! lat:" + latitude + " long:" + longitude);
          });
        }*/
      }
      //Send the event as required
      myStat.session = this.getSessionId();
      myStat.ressource = ressource;
      myStat.action = action;
      if (myStat.action == StatAction.NAVIGATION_START && (myStat.ressource.includes('auth') || myStat.ressource.includes('admin'))) {
        //console.log("STATS: skipping ", myStat.ressource);
      } else {
      //console.log("SENDING STATS:",myStat);
      this.http.post(environment.apiURL + '/stats/save', {stat:myStat}).subscribe();
      }
    }
  }

}