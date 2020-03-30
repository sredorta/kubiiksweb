import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Setting, ISetting } from '../models/setting';
import { IUser, User } from '../models/user';
import { StateKey, makeStateKey, TransferState, Title, Meta } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { tap, map, filter } from 'rxjs/operators';
import { KiiMainUserService } from './kii-main-user.service';
import { KiiMainSettingService } from './kii-main-setting.service';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { Page, IPage } from '../models/page';
import { KiiMainPageService } from './kii-main-page.service';
import { KiiMainArticleService } from './kii-main-article.service';
import { IArticle, Article } from '../models/article';


//This service loads the initial page data from transfer state or from http
//Sets the settings and the user

/**Internal interface */
interface _IInitialData  {
  settings: ISetting[],
  pages: IPage[],
  articles: IArticle[],
  user?:IUser
}


@Injectable({
  providedIn: 'root'
})
export class KiiMainDataService extends KiiBaseAbstract {
  isInitialLoaded :BehaviorSubject<boolean> = new BehaviorSubject(false);
  offline :BehaviorSubject<boolean> = new BehaviorSubject(false);


  isFullLoaded:boolean = false;

  constructor(
    private http:HttpClient,
    private transfer : TransferState,
    private user: KiiMainUserService,
    private setting: KiiMainSettingService,
    private pages: KiiMainPageService,
    private translate: KiiTranslateService,
    private articles: KiiMainArticleService,
    private title : Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

  /**Loads the initial data and handles state transfer to avoid double http calls */
  public loadInitialData(page_name:string, articleId:number=0) : void {
      console.log ("LOADING INITIAL DATA !");
      if (!this.isFullLoaded) {
        const key: StateKey<_IInitialData> = makeStateKey<_IInitialData>('transfer-intial');
        //RESTORE FROM TRANSFER STATE
        //When restoring from state transfer the user is unknown so we need to load the user appart
        let myData = null;
        if (isPlatformBrowser(this._platformId)) {
          myData = this.transfer.get(key, null);
          if (myData) {
            this._update(myData);
            this.transfer.set(key,null);
            //console.log("RESTORED FROM TRANSFER STATE", myData);
            this.isInitialLoaded.next(true);
          } 
        }
        //DO HTTP CALL IF NOT RESTORED
        if (!myData) {
          this.addSubscriber(
            this.http.post<_IInitialData>(environment.apiURL + '/initial', {page:page_name,articleId:articleId}).subscribe(res => {
              //console.log("INITIAL DATA", res);
              if (isPlatformServer(this._platformId)) {
                this.transfer.set(key, res);
              }
              this._update(res);
              console.log("GOT INITIAL FROM NETWORK",res);
              this.isInitialLoaded.next(true);
            },()=> this.isInitialLoaded.next(true))
          )
        }
        //Get Auth user
        if (isPlatformBrowser(this._platformId)) 
          if (User.hasToken()) 
            this.addSubscriber(
              this.user.getAuthUser().subscribe(res => {
                  this.user.setLoggedInUser(new User(res));
              })
            )
      }
  }

  /**Loads all settings and articles so that when we go offline we have them all, this is done only on browser */
  loadFullData(delay:number) {
        //Load all data
        if (isPlatformBrowser(this._platformId))
          setTimeout(()=> {
              this.addSubscriber(
                this.http.get<_IInitialData>(environment.apiURL + '/initial/full').subscribe(res => {
                  //console.log("FULL LOAD !", res);
                  this._update(res);
                  this.isFullLoaded = true;
                })
              )
          },delay);
  }


  private _update(data:_IInitialData) {
    //Update settings
    let settings : Setting[] = [];
    for (let setting of data.settings) {
      settings.push(new Setting(setting));
    }
    this.setting.setSettings(settings);
    //Update pages
    let pages = this.pages.value();
    for (let page of data.pages) {
      if (!this.pages.hasPage(page.page))
        pages.push(new Page(page));
      else
        this.pages.refresh(new Page(page),false);  
    }
    this.pages.set(pages);

    //Update articles
    let articles = this.articles.value();
    for (let article of data.articles) {
      if (!this.articles.getById(article.id).exists()) {
        articles.push(new Article(article));
      } else
        this.articles.refresh(new Article(article),false);  
    }
    //Update user
    if (data.user) this.user.setLoggedInUser(new User(data.user));
    this.articles.set(articles);
  }



  /**Updates meta tags for seo */
  seo(page:Page,url:string) {
    if (isPlatformBrowser(this._platformId)) {
      document.documentElement.lang = this.translate.getCurrent()
    }

    if (page.exists()) {
      this.title.setTitle( this.setting.getByKey('sitename').value + " - "+ page.title);
      this.meta.updateTag({ name: 'description', content: page.description });
      this.meta.updateTag({name:"robots", content:"index, follow"});
      this.meta.updateTag({ property: 'og:title', content: this.setting.getByKey('sitename').value + " : " + page.title });
      this.meta.updateTag({ property: 'og:description', content: page.description });
      this.meta.updateTag({ property: 'og:url', content: this.setting.getByKey('url').value + url });
      if (!page.image) 
        this.meta.updateTag({ property: 'og:image', content: this.setting.getByKey('url_image').value });
      else
        this.meta.updateTag({ property: 'og:image', content: page.image });
      this.meta.updateTag({ property: 'og:site_name', content: this.setting.getByKey('sitename').value });
      this.meta.updateTag({ property: 'og:type', content: "website" });
      this.meta.updateTag({ property: 'article:author', content: this.setting.getByKey('url').value });


      this.meta.updateTag({ property: 'fb:app_id', content: this.setting.getByKey('fb_app_id').value });
      this.meta.updateTag({ property: 'twitter:card', content: "summary" });
      this.meta.updateTag({ property: 'twitter:title', content: this.setting.getByKey('sitename').value + " : " + page.title });
      this.meta.updateTag({ property: 'twitter:description', content: page.description });
      this.meta.updateTag({ property: 'twitter:site', content: this.setting.getByKey('sitename').value });
      if (!page.image) 
        this.meta.updateTag({ property: 'twitter:image', content: this.setting.getByKey('url_image').value });
      else
        this.meta.updateTag({ property: 'twitter:image', content: page.image });
    }
  }


}