import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';


@Component({
  selector: 'article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent extends KiiBaseAbstract implements OnInit {

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
    this.addSubscriber(
      this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.id = 2000;
          //We need to check if articles are not load then load it
          let index = this.articles.value().findIndex(obj=> obj.id == this.id);
          console.log(this.articles.value().length,index);
          if (index>0) {
            this.article = this.articles.value()[index];
          } else {
            this.loadArticle();
          }
      })
    )

    this.addSubscriber(
      this.articles.onChange.subscribe(res => {
        let index = this.articles.value().findIndex(obj=> obj.id == this.id);
        if (index>0) {
          this.article = this.articles.value()[index];
        }
      })
    )
  }



  loadArticle() {
    this.addSubscriber(
      this.articles.loadById(this.id).subscribe(res => {
        if (res.id == null) {
          this.navigateNotFound();
        } else {
          this.article = res;
        }
      })
    )
  }
  navigateNotFound() {
    console.log("Not found !!!");
    this.router.navigate([this.trans.getCurrent()+'/not-found']);
    //    let translatedPath: any = this.localize.translateRoute('/404');
    //    this.router.navigate([translatedPath]);
  }
}



