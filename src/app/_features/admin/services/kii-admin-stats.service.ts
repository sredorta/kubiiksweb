import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';



export interface IStatWindow {
  current : number;
  previous:number;
}

class StatResult {
  visits_count : IStatWindow = {current:0,previous:0};
  visits_duration : IStatWindow = {current:0,previous:0};
  pages_count : IStatWindow = {current:0,previous:0};
  pages_per_visit : IStatWindow = {current:0,previous:0};
  social_click_count : IStatWindow = {current:0,previous:0};
  chat_click_count : IStatWindow = {current:0,previous:0};
  chat_duration : IStatWindow = {current:0,previous:0};
  chat_message_count : IStatWindow = {current:0,previous:0};
  app_install_count : IStatWindow = {current:0,previous:0};


  visits_hours_histogram : any[] = [[],[],[],[],[],[],[],[]];
  visits_over_day : any[] = [];
  app_over_day : any [] = [];
  newsletter_over_day : any = [];
  referrals_histogram : any[] = [];
  social_over_day : any = {all:[]};
  social_histogram : any[] = [];
  pages_visited_histogram : any = {};
  languages : any[] = [];

  constructor(obj: any | null) {
      if (obj) {
          Object.keys(this).forEach(key => {
              if (obj[key] != undefined) 
                  this[key] = obj[key];
          });
      } 
  }

}

@Injectable({
  providedIn: 'root'
})

//Handles all stats
export class KiiAdminStatsService {
  //private offline$ = new BehaviorSubject<boolean>(false);
  //private offline : boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any,private http: HttpClient) {
/*
    if (isPlatformBrowser(this.platformId)) {
          //Online/Offline detection
          window.addEventListener('online', event => {
            this.offline$.next(false);
          })
          window.addEventListener('offline', event => {
            this.offline$.next(true);
          })
    }
    this.offline$.subscribe(res => {
        this.offline = res;
    })*/
   }

  /**Gets stats */
  public analyze(days:number) :Observable<any> {
    return this.http.post(environment.apiURL + '/stats/analyze', {days: days}).pipe(map(res => new StatResult(res)));
  }
  /**Removes all fields */
  public reset() :Observable<any> {
    return this.http.post(environment.apiURL + '/stats/delete', {});
  }

}
