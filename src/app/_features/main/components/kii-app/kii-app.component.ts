import { Component, OnInit, Inject, PLATFORM_ID, ComponentFactoryResolver, Renderer2, HostListener, NgZone } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { MatBottomSheet } from '@angular/material';
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

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  showPopup : boolean = false;
  public schemaSite : any = {};
  public schemaCorporation: any = {};

  constructor(@Inject(PLATFORM_ID) private platform: any,
  private kiiTrans: KiiTranslateService,
  private viewTrans : KiiViewTransferService,
  private bottomSheet: MatBottomSheet,
  private router : Router,
  private cookies : KiiMainCookiesService,
  private stats : KiiMainStatsService,
  private data: KiiMainDataService,
  private kiiSettings: KiiMainSettingService,
  private viewPort: ViewportRuler,
  private scrollDisp: ScrollDispatcher,
  private ngZone: NgZone,
  private pwa: KiiPwaService
  ) { super() }

  ngOnInit() {
    console.log("KIIAPP ONINIT");
    this.viewTrans.scroll();

    //Sets language required context
    this.kiiTrans.setRequiredContext(['main']);


    //Load full data
    this.data.loadFullData(10000);
    //If we change language we reload all data with new translations
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.kiiTrans.onChange.subscribe(res => {
          console.log("TRANSLATION CHANGED",res);
          this.data.isFullLoaded = false;
          this.data.loadFullData(0);
        })
      )

    //When settings are available open popup if enabled
    let settingsSubs =  this.kiiSettings.onChange.subscribe(res => {
        if (this.kiiSettings.loaded) {
          this.openPopupDialog();
          this.schemaSite = SEO.schemaInit('site',this.kiiSettings.getValue());
          this.schemaCorporation = SEO.schemaInit('corporation',this.kiiSettings.getValue());
        }
    }, () => {
        settingsSubs.unsubscribe();
    })



    //Handle cookies
    this.addSubscriber(
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (res : NavigationEnd) => {
          if (res.url.includes('cookies')) {
            this.bottomSheet.dismiss();
          } else {
            if (isPlatformBrowser(this.platform)) {
              this.addSubscriber(
                this.cookies.showCookies.subscribe(res => {
                  if (res) this.openBottomSheetCookies();
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

  openBottomSheetCookies(): void {
/*    this.bottomSheet.open(KiiBottomSheetCookiesComponent, {
        panelClass :"default-theme",
        disableClose:true,
        scrollStrategy: new NoopScrollStrategy()  //Avoid scrolling to top !
        }) 
    let subs = this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(res => {
        if (res) {
          if (res.result == "accept") {
             this.cookies.accept();
             this.stats.send(StatAction.NAVIGATION_START ,this.router.url);
          } else this.cookies.refuse();
          subs.unsubscribe();
        }
        //If our current route is /auth/cookies then navigate back
        //if (this.router.url.includes('cookies')) this.location.back();
      })   */ 
  }

  openPopupDialog() {
    if (isPlatformBrowser(this.platform)) {
      //Get the popup setting from localstorage
      let storage = localStorage.getItem("popup");
      let value = this.kiiSettings.getByKey("popup-show").value;
      if (value != "disabled" && (!storage || !storage.includes(value))) {
        setTimeout(() => {
            console.log("WE ARE HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! POPUP NOW!!")
            this.showPopup = true;
            /*this.dialog.open(KiiPopupDialogComponent, {
              panelClass: '',
              data:  null,
              maxHeight:'90vh',
              minWidth:'320px'
            });*/
        },1000);
        if (this.cookies.areAccepted())
          localStorage.setItem("popup", value );
      }
    }
  }


}
