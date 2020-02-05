import { Injectable,Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor,HttpHeaders } from '@angular/common/http';
import { Observable,  Subscription } from 'rxjs';
import { KiiTranslateService } from '../services/kii-translate.service';
import { environment } from 'src/environments/environment';


//We intercept all http requests and do some things here

@Injectable()
export class KiiHttpLangInterceptor implements HttpInterceptor {
    subscription: Subscription = new Subscription();
    constructor(
        private kiiTrans: KiiTranslateService,
        @Inject(PLATFORM_ID) private _platformId: Object, 
        @Optional() @Inject(REQUEST) private _request: Request,
        ) {}
    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers : HttpHeaders;
        headers = new HttpHeaders({
            'Accept-Language': this.kiiTrans.getCurrent(),
        });     
        if (isPlatformBrowser(this._platformId)) {
            //When it's the browser we need to map the URL to the real domain
            request= request.clone({url: request.url.replace(environment.kiiserverURL,environment.kiiserverExtURL)});
        }
        console.log("SET HEADERS LANG:", this.kiiTrans.getCurrent());
        //Handle the response
        return next.handle(request.clone({headers}))
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}