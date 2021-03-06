import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../../main/models/user';
import { Alert } from '../../main/models/alert';

export interface IOauth2 {
  /**Tells if the user has all fields */
  complete:boolean,
  /**Current user details */
  user: IUser
}

export interface ILoginCredentials {
  username:string;
  password:string;
  keepconnected:boolean
}
export interface ISignupCredentials {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  terms:boolean;
  newsletter:boolean;
}

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
export class KiiAuthUserService {


  constructor(private http: HttpClient) { }

  /** Login user using local passport */
  public login(credentials:ILoginCredentials) {
    return this.http.post<IUserWithToken>(environment.apiURL + '/auth/login', credentials);
  }

  /** Signup user using local passport */
  public signup(credentials:ISignupCredentials) {
    return this.http.post<IUserWithToken | IMessage>(environment.apiURL + '/auth/signup', credentials);
  }

  /** Reset password */
  public resetpassword(value:any) {
    return this.http.post<any>(environment.apiURL + '/auth/reset-password/email', value);
  }

  /**Re-establish password after reset */
  public establishpassword(value:any) {
    return this.http.post<IUserWithToken>(environment.apiURL + '/auth/establish-password', value);
  }

  /** Validate if oauth2 login has all required fields of signup */
  public oauth2Validate() {
    return this.http.get(environment.apiURL + '/auth/oauth2/validate').pipe(map(res => <IOauth2>res));;
  }

  /** Validate if oauth2 login has all required fields of signup */
  public oauth2Update(user:IUser,newsletter:boolean) :Observable<IUser> {
    let data :any = user;
    data.newsletter = newsletter;
    return this.http.post<IUser>(environment.apiURL + '/auth/oauth2/update', data).pipe(map(res => <IUser>res));;
  }

  /**Validate email account by providing id and key */
  public validateEmail(params:any) {
    return this.http.post<any>(environment.apiURL + '/auth/validate-email',{id:params.id,key:params.key});
  }



  /**Updates current user. Only need to be registered */
  public updateAuthUser(value:any) {
    return this.http.post(environment.apiURL + '/auth/update', value).pipe(map(res => <IUser>res));
  }

  /**Removes current user. Only need to be registered */
  public deleteAuthUser() {
    return this.http.delete(environment.apiURL + '/auth/delete');
  } 

  /**Updates alert from user */
  public updateAlert(alert:Alert) {
    return this.http.post<any>(environment.apiURL + '/alert/update', {alert: alert});//.pipe(map(res => new Alert(res)));
  }

  /**Deletes alert from user */
  public deleteAlert(alert:Alert) {
    return this.http.post<any>(environment.apiURL + '/alert/delete', {id: alert.id});//.pipe(map(res => new Alert(res)));
  }

   /**Unsubscribe to newsletter*/
   public unsubscribeNews(email:string) {
    return this.http.post<any>(environment.apiURL + '/newsletter/unsubscribe', {email: email});
  } 

}
