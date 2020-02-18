import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KiiServiceAbstract } from 'src/app/abstracts/kii-service.abstract';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../main/models/page';
import { KiiMainPageService } from '../../main/services/kii-main-page.service';

@Injectable({
  providedIn: 'root'
})
export class KiiAdminPageService  {


  constructor(private _http: HttpClient, private kiiMainPage: KiiMainPageService) { }


  /**Loads all elements from http call*/
  public load() {
      return this._http.get<Page[]>(environment.apiURL + '/page/all').pipe(map(res => {
          let result :Page[] = [];
          for (let item of res)
              result.push(new Page(item));
          return result;
      }))
  }   

  /**Deletes element in database*/
  public delete(element:Page) {
      return this._http.post<any>(environment.apiURL + '/page/delete', {id:element.id});
  }

  /**Update page in database : kubiiks rights required*/
  public update(element:Page) {
      return this._http.post<Page>(environment.apiURL + '/page/update', {page: element}).pipe(map(res => new Page(res)));
  }   





}
