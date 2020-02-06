import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
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
export class KiiAuthService {

  /** Contains current loggedIn user */
  private _user = new BehaviorSubject<User>(new User(null)); //Stores the current user

  /**Contains current number of unread notifications of the user */
  private _alerts = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platform: any) { }


  /**Sets current loggedIn user */
  public setLoggedInUser(user:User) {
    this._user.next(user);
    this._alerts.next(user.getUnreadAlertCount());
  }

  /**Gets current loggedIn user as an observable */
  public getLoggedInUser() {
    return this._user;
  }

  /**Gets current value of loggedInUser as an User object */
  public getLoggedInUserValue() {
    return this._user.value;
  }


  /**Gets observable with notifications unread */
  public getUnreadNotifications() {
    return this._alerts;
  }

  /** getAuthUser expects that we send the bearer token and will return the current user details */
  public getAuthUser() {
    return this.http.get(environment.apiURL + '/auth/get').pipe(map(res => <IUser>res));
  }

  public logout() {
    if (isPlatformBrowser(this.platform))
        User.removeToken();
    this._user.next(new User(null));
  }

}
