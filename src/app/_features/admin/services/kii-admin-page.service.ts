import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Page } from '../models/page';
import { environment } from 'src/environments/environment';
import { KiiServiceAbstract } from 'src/app/abstracts/kii-service.abstract';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KiiAdminPageService  {

  public onChange : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _data:  Array<Page> = [];

  constructor(private _http: HttpClient) { }


  /**Sets the data and triggers onChange */
  public set(data: Array<Page>) {
      this._data = data;
      this.onChange.next(!this.onChange.value);
  }

  /**Gets the data stored in memory */
  public get() {
      return this._data;
  }

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

  /**Gets value of desired setting by giving it's key */
  public getByKey(page_name:string) {
      if (!this._data) return new Page(null);
      let page = this._data.find(obj => obj.page == page_name);
      if (!page) return new Page(null);
      return page;
  }  

  /**Updates the element only in memory and triggers onChange */
  public refresh(element:Page) {
      let myIndex = this._data.findIndex(obj => obj.id == element.id);
      if (myIndex>=0) {
            this._data[myIndex] = element;
            this.onChange.next(!this.onChange.value);
      }
  }

}
