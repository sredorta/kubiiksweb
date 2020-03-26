import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Router } from '@angular/router';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons/faFeatherAlt';
import { Article } from 'src/app/_features/main/models/article';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent extends KiiBaseAbstract implements OnInit {

  currentLang=this.translate.getCurrent();

  displayedArticles : Article[] = [];

  isLoading : boolean = true;

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiAuth: KiiMainUserService, 
    private router: Router,
    private pages: KiiMainPageService,
    private data: KiiMainDataService,
    public articles: KiiMainArticleService,
    private translate: KiiTranslateService,
    @Inject(PLATFORM_ID) private platform: any
    ) {super(); }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','demo']);


    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('demo'))
          this.data.seo(this.pages.getByKey('demo'), this.router.url);
      })
    )
    this.addSubscriber(
      this.data.isInitialLoaded.subscribe(res => {
        this.isLoading = !res;
      })
    )
    this.data.loadInitialData('demo');
    //If we change language we reload articles
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.translate.onChange.subscribe(res => {
          this.data.isFullLoaded = false;
          this.data.loadInitialData('demo');
        })
      )
  }

  logout() {
    this.kiiAuth.logout();
    this.router.navigate(['']);
  }

  /**When paginator provides results */
  onPaginatorChanges(displayedArticles:Article[]) {
    this.displayedArticles = displayedArticles;
  }

}
