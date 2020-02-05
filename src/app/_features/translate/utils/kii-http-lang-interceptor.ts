import { Injectable } from '@angular/core';

import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor,HttpHeaders } from '@angular/common/http';
import { Observable,  Subscription } from 'rxjs';
import { KiiTranslateService } from '../services/kii-translate.service';


//We intercept all http requests and do some things here

@Injectable()
export class KiiHttpLangInterceptor implements HttpInterceptor {
    constructor(private kiiTrans: KiiTranslateService,) {}
    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers : HttpHeaders;
        headers = new HttpHeaders({
            'Accept-Language': this.kiiTrans.getCurrent(),
        });     
        //Handle the response
        return next.handle(request.clone({headers}))
    }

}