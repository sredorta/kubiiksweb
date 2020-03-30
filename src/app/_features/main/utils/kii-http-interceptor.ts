import { Injectable, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor,HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable,  Subscription, throwError } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
import {  MatBottomSheet } from '@angular/material';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiHttpErrorComponent } from '../components/kii-http-error/kii-http-error.component';
import { User } from '../models/user';
import { KiiMainUserService } from '../services/kii-main-user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { KiiMainDataService } from '../services/kii-main-data.service';


//We intercept all http requests and do some things here

@Injectable()
export class KiiHttpInterceptor implements HttpInterceptor {
    constructor(
        private kiiTrans: KiiTranslateService,
        private kiiAuth: KiiMainUserService,
        private router : Router,
        private data: KiiMainDataService,
        private kiiBottomSheet: MatBottomSheet,
        //private bottomSheet: KiiBottomSheetComponent,
        @Inject(PLATFORM_ID) private _platformId: any, 

        ) {}

    /** Opens bottomsheet with error or success message */
    openBottomSheet(message:string): void {
        console.log("Open bottomsheet http interceptor !")
        if (isPlatformBrowser(this._platformId)) {
            this.kiiBottomSheet.open(KiiHttpErrorComponent,{
                scrollStrategy: new NoopScrollStrategy(),
                data:{message:message}
            });
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tmpHeaders: any = {};
        tmpHeaders['Accept-Language'] = this.kiiTrans.getCurrent();
        if (!isPlatformBrowser(this._platformId)) {
            if (request.headers.has("Authorization"))
                tmpHeaders['Authorization'] = request.headers.get('Authorization');
        } else {
            if (User.getToken())
                tmpHeaders['Authorization'] =  'Bearer ' + User.getToken();
            //We are in the browser and then we do the request directly from browser to server    
            request= request.clone({url: request.url.replace(environment.kiiserverURL,environment.kiiserverExtURL)});
        }     
        let headers : HttpHeaders;
        headers = new HttpHeaders(tmpHeaders);     
        //Handle the response
        let newRequest = request.clone({headers});
        return next.handle(newRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log(event);
                if (event.body)
                    if (event.body.message)
                        if (event.body.message.show) 
                            this.openBottomSheet(event.body.message.text)
                }
                return event;
            }
            ),
            catchError((error: HttpErrorResponse) => {
                console.log("HERE !!!",error);
                switch(error.status) {
                    case 0: //No internet connection
                        this.data.offline.next(true);
                        break;
                    case 504:   //Timeout
                        this.data.offline.next(true);
                        break;    
                    case 401: //Bad auth
                        this.data.offline.next(false);

                        if (isPlatformBrowser(this._platformId)) {
                            User.removeToken();
                            this.kiiAuth.setLoggedInUser(new User(null));
                            if (!error.error.message) 
                                error.error.message = this.kiiTrans.translations[this.kiiTrans.getCurrent()]['m.error.token'];
                            this.router.navigate(['/'+this.kiiTrans.getCurrent()+'/auth/login']);
            
                        }
                        this.openBottomSheet(error.error.message);
                        break;
                    default: 
                        this.data.offline.next(false);
                        if (error && error.error && error.error.message)
                            this.openBottomSheet(error.error.message);   
                        break;    
                }
                return throwError(error);
            })
            );
    }
}