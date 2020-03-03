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
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends KiiBaseAbstract implements OnInit {

  loggedInUser = new User(null);
  icons = [];
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
    this.kiiTrans.setRequiredContext(['main','blog']);
    this.icons['close'] = faTimes;
    this.icons['created']=faFeatherAlt;

    this.addSubscriber(this.kiiAuth.getLoggedInUser().subscribe(res => this.loggedInUser = res));
    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('blog'))
          this.data.seo(this.pages.getByKey('blog'), this.router.url);
      })
    )
    this.addSubscriber(
      this.data.isInitialLoaded.subscribe(res => {
        this.isLoading = !res;
      })
    )
    this.data.loadInitialData('blog');
    //If we change language we reload articles
    if (isPlatformBrowser(this.platform))
      this.addSubscriber(
        this.translate.onChange.subscribe(res => {
          console.log("TRANSLATION CHANGED",res);
          this.data.isFullLoaded = false;
          this.data.loadInitialData('blog');
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
