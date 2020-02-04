import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';


export interface INewsletter {
    firstName:string,
    lastName:string,
    email:string
}

@Injectable({
  providedIn: 'root'
})
export class KiiApiNewsletterService {

  constructor(private http:HttpClient) { }

   /**Update article in database*/
   public subscribeNews(news:INewsletter) {
    return this.http.post<any>(environment.apiURL + '/newsletter/subscribe', news);
  } 
   /**Update article in database*/
   public unsubscribeNews(email:string) {
    return this.http.post<any>(environment.apiURL + '/newsletter/unsubscribe', {email: email});
  } 

}