import { Component, OnInit, Inject, PLATFORM_ID, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { MatBottomSheet } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { KiiViewTransferService } from '../../services/kii-view-transfer.service';
import { KiiCookiesService } from '../../services/kii-cookies.service';
import { KiiHttpErrorComponent } from '../kii-http-error/kii-http-error.component';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../../models/user';
import { KiiAuthService } from '../../services/kii-auth.service';

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platform: any,
  private kiiTrans: KiiTranslateService,
  private kiiAuth: KiiAuthService,
  private viewTrans : KiiViewTransferService,
  private bottomSheet: MatBottomSheet,
  private router : Router,
  private cookies : KiiCookiesService,
  private r: Renderer2,
  private location : Location) { super() }

  ngOnInit() {
    this.viewTrans.scroll();

    //Sets language required context
    this.kiiTrans.setRequiredContext(['main']);

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

    //Get current user if any
    if (isPlatformBrowser(this.platform)) {
      if (User.hasToken()) 
        this.addSubscriber(
          this.kiiAuth.getAuthUser().subscribe(res => {
            this.kiiAuth.setLoggedInUser(new User(res))
          })
        )
    }
  }

  openBottomSheetCookies(): void {
    this.bottomSheet.open(KiiBottomSheetCookiesComponent, {
        panelClass :"default-theme",
        disableClose:true,
        scrollStrategy: new NoopScrollStrategy()   //Avoid scrolling to top !
        }) 
    let subs = this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(res => {
        if (res) {
          if (res.result == "accept") this.cookies.accept();
          else this.cookies.refuse();
          subs.unsubscribe();
        }
        //If our current route is /auth/cookies then navigate back
        //if (this.router.url.includes('cookies')) this.location.back();
      })    
  }

 


}
