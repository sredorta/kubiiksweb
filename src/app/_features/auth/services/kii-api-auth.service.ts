import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../../main/models/user';

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
export class KiiApiAuthService {


  constructor(private http: HttpClient, private kiiTrans: KiiTranslateService) { }

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

  /** getAuthUser expects that we send the bearer token and will return the current user details */
  public getAuthUser() {
    return this.http.get(environment.apiURL + '/auth/get').pipe(map(res => <IUser>res));
  }



}
