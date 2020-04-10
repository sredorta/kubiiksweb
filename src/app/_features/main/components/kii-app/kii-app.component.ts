import { Component, OnInit, Inject, PLATFORM_ID, ComponentFactoryResolver, Renderer2, HostListener, NgZone, ViewChild } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { NoopScrollStrategy, BlockScrollStrategy, RepositionScrollStrategy } from '@angular/cdk/overlay';
import { KiiViewTransferService } from '../../services/kii-view-transfer.service';
import { KiiMainCookiesService } from '../../services/kii-main-cookies.service';
import { KiiHttpErrorComponent } from '../kii-http-error/kii-http-error.component';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../../models/user';
import { KiiMainUserService } from '../../services/kii-main-user.service';
import { ViewportScrollPosition, ViewportRuler, ScrollDispatcher, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { KiiMainStatsService } from '../../services/kii-main-stats.service';
import { StatAction } from '../../models/stat';
import { KiiMainDataService } from '../../services/kii-main-data.service';
import { KiiMainSettingService } from '../../services/kii-main-setting.service';
import { SEO } from '../../models/seo';
import { KiiPwaService } from '../../services/kii-main-pwa.service';
import { KiiPopupDialogComponent } from '../kii-popup-dialog/kii-popup-dialog.component';
import { KiiAuthUserService } from 'src/app/_features/auth/services/kii-auth-user.service';
import { SwPush } from '@angular/service-worker';
import { KiiMainNetworkService } from '../../services/kii-main-network.service';

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  public schemaSite : any = {};
  public schemaCorporation: any = {};

  /**Indicates if popup has already been shown */
  private hasShownPopup : boolean = false;

  /**Current loggedInUser */
  loggedInUser : User = new User(null);

  /**When we are in browser */
  isBrowser = isPlatformBrowser(this.platform);

  /**When we are in chat page so that chat icon han be hidden */
  isChatRoute: boolean = false;

  /**Offline mode */
  offline: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platform: any,
  private bottomSheet: MatBottomSheet,
  private dialog: MatDialog,
  private kiiTrans: KiiTranslateService,
  private viewTrans : KiiViewTransferService,
  private router : Router,
  private cookies : KiiMainCookiesService,
  private stats : KiiMainStatsService,
  private data: KiiMainDataService,
  private kiiSettings: KiiMainSettingService,
  private auth : KiiMainUserService,
  private pwa: KiiPwaService,
  private swPush : SwPush,
  private ngZone: NgZone,
  private network: KiiMainNetworkService
  ) { super() }



  ngOnInit() {
    this.viewTrans.scroll();
    //Sets language required context
    this.kiiTrans.setRequiredContext(['main']);

    //Keep track of auth user
    this.addSubscriber(
      this.auth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )

    this.addSubscriber(
      this.network.offline.subscribe(res => {
        this.offline = res;
      })
    )

    //Load full data
    this.data.loadFullData(5000);
    //If we change language we reload all data with new translations
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.kiiTrans.onChange.subscribe(res => {
          this.data.isFullLoaded = false;
          this.data.loadFullData(0);
        })
      )

    //When settings are available open popup if enabled
    let settingsSubs =  this.kiiSettings.onChange.subscribe(res => {
        if (this.kiiSettings.loaded && !this.hasShownPopup) {
          this.openPopupDialog();
          this.schemaSite = SEO.schemaInit('site',this.kiiSettings.getValue());
          this.schemaCorporation = SEO.schemaInit('corporation',this.kiiSettings.getValue());
          this.hasShownPopup = true;
        }
    }, () => {
        settingsSubs.unsubscribe();
    })

    //TODO add onPUSH to any connection even if not loggedIn

    //Subscribe to general onPush notifications (any connection)
    this.pwa.onPushNotificationSubscriptionSession(); //Stores onPush data to session

    //Subscribe to onPush notifications for users
    this.addSubscriber(
      this.auth.getLoggedInUser().subscribe(res => {
        if (res.exists()) {
          this.pwa.onPushNotificationSubscriptionUser(); //Adds onPush field to user
        }
      })
    )
    //Subscribe to notifications click and redirect to site if click
    if (isPlatformBrowser(this.platform)) {
      this.addSubscriber(
        this.swPush.messages.subscribe((res:any) => {
          //Update auth user as we have to update alerts if notification is to user
          if (res && res.notification && res.notification.data && res.notification.data.user)
            this.auth.setLoggedInUser(new User(res.notification.data.user));
        })
      )
      //When notification is click go to home page
      this.addSubscriber(
        this.swPush.notificationClicks.subscribe( event => {
          const url = event.notification.data.url;
          window.open(url, '_blank');
        })
      )
    }



    //Handle cookies
    this.addSubscriber(
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (res : NavigationEnd) => {
          if (res.url.includes('cookies')) {
            this.bottomSheet.dismiss();
          } else {
            if (isPlatformBrowser(this.platform)) {
              this.addSubscriber(
                this.cookies.showCookies.subscribe(res => {
                  if (res)
                     this.openBottomSheetCookies();
                })
              )
            }
          }
        })
    );

    //Handle pages stats
    this.addSubscriber(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.stats.send(StatAction.NAVIGATION_START ,this.router.url);
          this.isChatRoute = this.router.url.includes('/chat');
        }
      })
    )
  }


  //Detect when user closes the app so that we can save end-time of the session
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      this.stats.send(StatAction.APP_END,this.router.url);
      this.stats.clearSession();
  }

  openBottomSheetCookies() {
    if (isPlatformBrowser(this.platform)) {
      setTimeout(()=> {
      let subs = this.bottomSheet.open(KiiBottomSheetCookiesComponent,
        {
          disableClose:true,
          scrollStrategy: new NoopScrollStrategy()
        }).afterDismissed().subscribe(res => {
        if (res) {
          if (res.result == "accept") {
            this.cookies.accept();
            this.stats.send(StatAction.NAVIGATION_START ,this.router.url);
          } else this.cookies.refuse();
          subs.unsubscribe();
        }
      });
      },2000);
   }
  }

  openPopupDialog() {
    if (isPlatformBrowser(this.platform)) {
      //Get the popup setting from localstorage
      let storage = localStorage.getItem("popup");
      let value = this.kiiSettings.getByKey("popup-show").value;
      if (value != "disabled" && (!storage || !storage.includes(value))) {
        setTimeout(() => {
            this.dialog.open(KiiPopupDialogComponent, {
              scrollStrategy: new NoopScrollStrategy(),
              panelClass: "kii-popup-dialog",
              maxWidth:"90vw"
            });
        },8000);
        if (this.cookies.areAccepted())
          localStorage.setItem("popup", value );
      }
    }
  }


}
