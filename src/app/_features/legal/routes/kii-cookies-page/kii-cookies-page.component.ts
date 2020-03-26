import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Router } from '@angular/router';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';

@Component({
  selector: 'kii-cookies-page',
  templateUrl: './kii-cookies-page.component.html',
  styleUrls: ['./kii-cookies-page.component.scss']
})
export class KiiCookiesPageComponent extends KiiBaseAbstract implements OnInit {

  constructor(
    private location : Location,
    private pages: KiiMainPageService,
    private data: KiiMainDataService,
    private router: Router,
    @Inject(PLATFORM_ID) private platform: any,
    private translate: KiiTranslateService,
    public articles: KiiMainArticleService
    ) { super()}

  ngOnInit() {
    this.translate.setRequiredContext(['legal']);
    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('legal'))
          this.data.seo(this.pages.getByKey('legal'), this.router.url);
      })
    )
    this.data.loadInitialData('legal');
    //If we change language we reload articles
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.translate.onChange.subscribe(res => {
          this.data.isFullLoaded = false;
          this.data.loadInitialData('legal');
        })
      )
  }


  goBack() {
    this.location.back();
  }
}
