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

  icons = [];

  schemaOrganization : any = {};

  isLoading:boolean = true;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiAuth: KiiMainUserService, 
    private kiiSettings: KiiMainSettingService,
    private pages: KiiMainPageService,
    private router: Router,
    private data: KiiMainDataService,
    public articles: KiiMainArticleService,
    @Inject(PLATFORM_ID) private platform: any
    ) {super(); }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','contact']);
    this.icons['close'] = faTimes;

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
    this.addSubscriber(
      this.data.isInitialLoaded.subscribe(res => {
        this.isLoading = !res;
      })
    )

    this.data.loadInitialData('contact');

  }

  logout() {
    this.kiiAuth.logout();
    this.router.navigate(['']);
  }

}
