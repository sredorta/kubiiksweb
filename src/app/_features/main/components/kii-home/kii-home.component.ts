import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiMainDataService } from '../../services/kii-main-data.service';
import { Router } from '@angular/router';
import { KiiMainSettingService } from '../../services/kii-main-setting.service';
import { KiiMainPageService } from '../../services/kii-main-page.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { isPlatformBrowser } from '@angular/common';
import { KiiTranslateModule } from 'src/app/_features/translate/kii-translate.module';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainArticleService } from '../../services/kii-main-article.service';

@Component({
  selector: 'kii-home',
  templateUrl: './kii-home.component.html',
  styleUrls: ['./kii-home.component.scss']
})
export class KiiHomeComponent extends KiiBaseAbstract implements OnInit {

  constructor(private data: KiiMainDataService, 
              private pages: KiiMainPageService,
              private settings: KiiMainSettingService,
              public articles: KiiMainArticleService,
              private router : Router,
              private translate: KiiTranslateService,
              @Inject(PLATFORM_ID) private platform: any) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('home'))
          this.data.seo(this.pages.getByKey('home'), this.router.url);
      })
    )
    this.data.loadInitialData('home');
    //If we change language we reload articles
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.translate.onChange.subscribe(res => {
          console.log("TRANSLATION CHANGED",res);
          this.data.isFullLoaded = false;
          this.data.loadInitialData('home');
        })
      )

    this.addSubscriber(
      this.articles.onChange.subscribe(res => {
        console.log("ARTICLES",this.articles.value());
      })
    )  
  }

}
