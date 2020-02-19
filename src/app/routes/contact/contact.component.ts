import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Router } from '@angular/router';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { SEO } from 'src/app/_features/main/models/seo';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';

@Component({
  selector: 'kii-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends KiiBaseAbstract implements OnInit {

  loggedInUser = new User(null);
  icons = [];

  schemaOrganization : any = {};


  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiAuth: KiiMainUserService, 
    private kiiSettings: KiiMainSettingService,
    private pages: KiiMainPageService,
    private router: Router,
    private data: KiiMainDataService,
    private translate: KiiTranslateService,
    public articles: KiiMainArticleService,
    @Inject(PLATFORM_ID) private platform: any
    ) {super(); }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','contact']);
    this.icons['close'] = faTimes;

    this.addSubscriber(this.kiiAuth.getLoggedInUser().subscribe(res => this.loggedInUser = res));
    //Add contact schema
    this.addSubscriber (
      this.kiiSettings.onChange.subscribe(res => {
          this.schemaOrganization = SEO.schemaInit("localBusiness", this.kiiSettings.getValue());
      })
    )
    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('contact'))
          this.data.seo(this.pages.getByKey('contact'), this.router.url);
      })
    )

    this.data.loadInitialData('contact');
    //If we change language we reload articles
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.translate.onChange.subscribe(res => {
          console.log("TRANSLATION CHANGED",res);
          this.data.isFullLoaded = false;
          this.data.loadInitialData('contact');
        })
      )
  }

  logout() {
    this.kiiAuth.logout();
    this.router.navigate(['']);
  }

}
