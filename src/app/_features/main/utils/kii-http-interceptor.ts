import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor,HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable,  Subscription, throwError } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
import {  MatBottomSheet } from '@angular/material';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiHttpErrorComponent } from '../components/kii-http-error/kii-http-error.component';
import { User } from '../models/user';


//We intercept all http requests and do some things here

@Injectable()
export class KiiHttpInterceptor implements HttpInterceptor {
    constructor(
        private kiiTrans: KiiTranslateService,
        @Inject(PLATFORM_ID) private _platformId: any, 
        private bottomSheet: MatBottomSheet, 

        ) {}
    
    /** Opens bottomsheet with error or success message */
    openBottomSheet(message:string): void {
        if (isPlatformBrowser(this._platformId))
            this.bottomSheet.open(KiiHttpErrorComponent, {
                panelClass :"default-theme",
                data: { 
                        message: message
                    }
            });
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
                console.log("Got error",error.error.message);
                this.openBottomSheet(error.error.message);
                return throwError(error);
            })
            );
    }
}