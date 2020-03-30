import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { isPlatformServer } from '@angular/common';


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
      @Optional() @Inject(RESPONSE) private response: Response,
      @Inject(PLATFORM_ID) private platformId: any,
      private trans: KiiTranslateService,
      private router : Router
              
            ) { super()}

  ngOnInit() {
    //Return 404 code if we are the server
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
    this.trans.setRequiredContext(['main','not-found']);

  }

  goHome() {
    this.router.navigate(['']);
  }
}



