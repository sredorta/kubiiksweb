import { Component, OnInit, Inject, PLATFORM_ID, ComponentFactoryResolver, Renderer2, HostListener, NgZone, ViewChild } from '@angular/core';
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
import { KiiDialog } from 'src/app/_features/dialog/services/kii-dialog.service';
import { KiiPopupDialogComponent } from '../kii-popup-dialog/kii-popup-dialog.component';
import { KiiBottomSheet } from 'src/app/_features/bottom-sheet/services/kii-bottom-sheet.service';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';

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


  constructor(@Inject(PLATFORM_ID) private platform: any,
  private kiiDialog: KiiDialog,
  private kiiBottomSheet: KiiBottomSheet,
  private kiiTrans: KiiTranslateService,
  private viewTrans : KiiViewTransferService,
  //private bottomSheet: MatBottomSheet,
  private router : Router,
  private cookies : KiiMainCookiesService,
  private stats : KiiMainStatsService,
  private data: KiiMainDataService,
  private kiiSettings: KiiMainSettingService,
  private pwa: KiiPwaService
  ) { super() }


  ngAfterViewInit() {
    setTimeout(() => {
      this.kiiBottomSheet.open(KiiBottomSheetCookiesComponent,{disableClose:true});
    },5000);
  }


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
        if (this.kiiSettings.loaded && !this.hasShownPopup) {
          this.openPopupDialog();
          this.schemaSite = SEO.schemaInit('site',this.kiiSettings.getValue());
          this.schemaCorporation = SEO.schemaInit('corporation',this.kiiSettings.getValue());
          this.hasShownPopup = true;
        }
    }, () => {
        settingsSubs.unsubscribe();
    })



    //Handle cookies
    this.addSubscriber(
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (res : NavigationEnd) => {
          if (res.url.includes('cookies')) {
            this.kiiBottomSheet.close();
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
/*    let ref = this.kiiBottomSheet.open(KiiBottomSheetCookiesComponent,{disableClose:true});
    let subs = ref.afterClosed.subscribe(res => {
      if (res) {
        if (res.result == "accept") {
           this.cookies.accept();
           this.stats.send(StatAction.NAVIGATION_START ,this.router.url);
        } else this.cookies.refuse();
        subs.unsubscribe();
      }
    });
    return ref;*/
  }

  openPopupDialog() {
    if (isPlatformBrowser(this.platform)) {
      //Get the popup setting from localstorage
      let storage = localStorage.getItem("popup");
      let value = this.kiiSettings.getByKey("popup-show").value;
      if (value != "disabled" && (!storage || !storage.includes(value))) {
/*        setTimeout(() => {
            console.log("WE ARE HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! POPUP NOW!!");
            this.kiiDialog.open(KiiPopupDialogComponent);
        },1000);*/
        if (this.cookies.areAccepted())
          localStorage.setItem("popup", value );
      }
    }
  }


}
