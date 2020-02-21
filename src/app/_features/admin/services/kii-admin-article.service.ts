import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KiiServiceAbstract } from 'src/app/abstracts/kii-service.abstract';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../main/models/page';
import { KiiMainPageService } from '../../main/services/kii-main-page.service';
import { Article } from '../../main/models/article';
import { KiiMainArticleService } from '../../main/services/kii-main-article.service';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class KiiAdminArticleService  {


  constructor(private _http: HttpClient, private kiiMainArticle : KiiMainArticleService) { }


  /**Update article*/
  public update(element:Article) {
      return this._http.post<Article>(environment.apiURL + '/article/update', {article: element}).pipe(map(res => new Article(res)));
  }   


  /**Deletes an article */
  public delete(element:Article) {
    return this._http.post<any>(environment.apiURL + '/article/delete', {id:element.id});
  }   

  /**Remove article from array and notify changes */
  public splice(element:Article) {
    let index = this.kiiMainArticle.value().findIndex(obj => obj.id == element.id);
    if (index>=0) {
        this.kiiMainArticle.value().splice(index,1);
        this.kiiMainArticle.set(this.kiiMainArticle.value());

    }
  }

  /**Create new article */
  public create(cathegory:string) {
    return this._http.post<Article>(environment.apiURL + '/article/create', {cathegory:cathegory}).pipe(map(res => new Article(res)));
  }

  /**Returns all articles from a cathegory without filtering */
  public getByCathegory(cathegory:string) {
        if (this.kiiMainArticle.value().length<=0) {
          return [];
        }
        return this.kiiMainArticle.value().filter(obj => obj.cathegory == cathegory).sort((a,b)=>b.order-a.order);
  }

  /**Refreshes element of the current values and notifies changes */
  public refresh(element:Article) {
    let index = this.kiiMainArticle.value().findIndex(obj => obj.id == element.id);
    if (index>=0) {
        this.kiiMainArticle.value().splice(index,1);
        this.kiiMainArticle.value().push(element);
        this.kiiMainArticle.set(this.kiiMainArticle.value());

    }
  }

  /**Moves article up in the order */
  public moveUp(article:Article) {
    return this._http.post<Article[]>(environment.apiURL + '/article/order/up', {id:article.id}).pipe(map(res =>{
        let result = [];
        for (let tmp of res) {
            result.push(new Article(tmp));
        }
        return result;
    }));
  }

  /**Moves article down in the order */
  public moveDown(article:Article) {
    return this._http.post<Article[]>(environment.apiURL + '/article/order/down', {id:article.id}).pipe(map(res =>{
        let result = [];
        for (let tmp of res) {
            result.push(new Article(tmp));
        }
        return result;
    }));
  }  




}
