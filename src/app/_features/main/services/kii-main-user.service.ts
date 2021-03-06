import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';



export interface IUserWithToken {
  token:string;
  user: IUser
}

export interface IMessage {
  message : {
    show:boolean;
    text:string;
  }
}


@Injectable({
  providedIn: 'root'
})
export class KiiMainUserService {

  /** Contains current loggedIn user */
  private _user = new BehaviorSubject<User>(new User(null)); //Stores the current user

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platform: any) { }


  /**Sets current loggedIn user */
  public setLoggedInUser(user:User) {
    this._user.next(user);
  }

  /**Gets current loggedIn user as an observable */
  public getLoggedInUser() {
    return this._user;
  }

  /** getAuthUser expects that we send the bearer token and will return the current user details */
  public getAuthUser() {
    if (isPlatformBrowser(this.platform))
      if (User.hasToken()) {
        return this.http.get(environment.apiURL + '/auth/get').pipe(map(res => <IUser>res));
      }
    return of(null);  
  }

  public logout() {
    if (isPlatformBrowser(this.platform))
        User.removeToken();
    this._user.next(new User(null));
  }

}
