import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KiiServiceAbstract } from 'src/app/abstracts/kii-service.abstract';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../main/models/page';
import { KiiMainPageService } from '../../main/services/kii-main-page.service';
import { Article } from '../../main/models/article';

@Injectable({
  providedIn: 'root'
})
export class KiiAdminArticleService  {


  constructor(private _http: HttpClient, private kiiMainPage: KiiMainPageService) { }


  /**Update page in database : kubiiks rights required*/
  public update(element:Article) {
      return this._http.post<Article>(environment.apiURL + '/article/update', {article: element}).pipe(map(res => new Article(res)));
  }   





}
