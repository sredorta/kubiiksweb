import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Page } from 'src/app/_features/main/models/page';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';


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
          //We need to check if articles are not load then load it
          let index = this.articles.value().findIndex(obj=> obj.id == this.id);
          this.trackArticles();
          if (index>0) {
            this.article = this.articles.value()[index];
          } else {
            this.data.loadInitialData('blog-item-page', this.id);
          }
      })
    )

  }

  trackArticles() {
    this.addSubscriber(
      this.articles.onChange.subscribe(res => {
        let index = this.articles.value().findIndex(obj=> obj.id == this.id);
        //Check for not-found condition
        if (index<0 && this.articles.value().length>0)  //Article not found
          this.navigateNotFound();
        if (index>=0 && !this.articles.value()[index].hasPage) //Article found but has no page
          this.navigateNotFound();
        if (index>=0) {
          this.article = this.articles.value()[index];
          //Here we need to update seo by using a virtual page as we use article title and description
          let myPage = new Page({    
            id: 1000,
            page: "blog-item-page",
            title: this.article.title,
            description:this.article.description,   
            image:this.article.image});
          this.data.seo(myPage, this.router.url);
        }
      })
    )
  }


  navigateNotFound() {
    this.router.navigate([this.trans.getCurrent()+'/not-found']);
  }
}

