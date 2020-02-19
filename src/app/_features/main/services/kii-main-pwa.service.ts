import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KiiBottomSheetSoftwareUpdateComponent } from '../components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiMainDataService } from './kii-main-data.service';


//NOTE: This service is only running on the browser
export interface Notification {
  action:string;
  data:any;
  title:string;
  body:string;
  icon:string;
  vibrate:any;

}


@Injectable({
  providedIn: 'root'
})
export class KiiPwaService {

  promptEvent : any = null;
  private hasApp = new BehaviorSubject<boolean>(false);

  constructor(
              private swUpdate: SwUpdate, 
              private swPush: SwPush,
              private http : HttpClient,
              private bottomSheet: MatBottomSheet,
              private data: KiiMainDataService,
              @Inject(PLATFORM_ID) private _platformId: any,) {


    if (isPlatformBrowser(this._platformId)) {
      if (navigator.serviceWorker && environment.production) {
        let obj = this;
        navigator.serviceWorker.getRegistrations().then(registrations => {
          if (registrations.length == 0) {
            navigator.serviceWorker.register('/ngsw-worker.js').then(function(registration) {
              console.log("SERVICE WORKER REGISTERED!!");
              ///obj.data.loadInitialData("all");

            }).catch(function(error) {
              console.log('SERVICE WORKER REGISTRATION FAILED:', error);
            });
          } else {
            //obj.data.loadInitialData("all");
              //Handle version updates if required we show bottom sheet and upload new version
              var refreshing;
              let myObj = this;
              navigator.serviceWorker.addEventListener('controllerchange',
                function() {
                  if (refreshing) return;
                  refreshing = true;
                  let myBottomSheet = myObj.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
                    panelClass :"default-theme",
                  })
                  myBottomSheet.afterDismissed().subscribe(res => {
                    if (res==true) {
                      window.location.reload();
                    }
                  })
                }
              );
          }
        });
        swUpdate.available.subscribe(event => {
          let myBottomSheet = this.bottomSheet.open(KiiBottomSheetSoftwareUpdateComponent, {
            panelClass :"default-theme",
          })
          myBottomSheet.afterDismissed().subscribe(res => {
            if (res==true) {
              window.location.reload();
            }
          })
        });
      } 

      //Handle install button and tell that we show the install bottom sheet
      window.addEventListener('beforeinstallprompt', event => {
        this.promptEvent = event;
        this.hasApp.next(true);
      });
    }
  }



  /**Returns if browser has service worker */
  hasServiceWorker() : boolean {
    return this.swUpdate.isEnabled;
  }

  /**Requests for subscribription to onPush notifications */
  onPushNotificationSubscription() {
    if (isPlatformBrowser(this._platformId) && this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublic
      })
      .then(sub => {
        this.http.post(environment.apiURL + '/notification/settings', { onPush : sub }).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));

      //When we recieve an onPush notification let's do whatever is required
      this.swPush.messages.pipe(map((res:any) => <Notification>res.notification)).subscribe(notification => {
        //console.log("swPush.messages.subscription");
        //console.log("Notification is:",notification)
      })
    }
  }

  installApp() {
    if (this.promptEvent)
     this.promptEvent.prompt();
  }

  canInstallApp() {
    return this.hasApp;
  }



}
