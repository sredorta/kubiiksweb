import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';


@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent extends KiiBaseAbstract implements OnInit {

  /**Id of the article that we want to display */
  id:number;

  article : Article = new Article(null);
  currentLang : string = null;
  showCreated : boolean = false;

  constructor(
      private route: ActivatedRoute, 
      private data : KiiMainDataService,
      private articles: KiiMainArticleService,
      private trans: KiiTranslateService,
      private router : Router
              
            ) { super()}

  ngOnInit() {
    this.trans.setRequiredContext(['main','not-found']);

  }

  goHome() {
    this.router.navigate(['']);
  }
}



