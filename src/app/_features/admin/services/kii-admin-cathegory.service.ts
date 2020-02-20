import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KiiServiceAbstract } from 'src/app/abstracts/kii-service.abstract';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../main/models/page';
import { KiiMainPageService } from '../../main/services/kii-main-page.service';
import { Article } from '../../main/models/article';
import { Cathegory } from '../models/cathegory';

@Injectable({
  providedIn: 'root'
})
export class KiiAdminCathegoryService  {


  constructor(private _http: HttpClient) { }


  /**Load all available cathegories */
  public load() {
    return this._http.get<Cathegory[]>(environment.apiURL + '/article/cathegory/all').pipe(map(res => {
        let result :Cathegory[] = [];
        for (let item of res)
            result.push(new Cathegory(item));
        return result;
    }))
  }  





}
