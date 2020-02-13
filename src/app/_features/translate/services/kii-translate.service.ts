import { Optional, Inject, Injectable, PLATFORM_ID, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { environment } from '../../../../environments/environment';
import { Observable,of, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { isPlatformBrowser, Location} from '@angular/common';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

declare var require: any;
const fs = require('fs');

export interface IKiiLanguage  {
    name:string;
    iso:string;
    code:string;
}

export interface IKiiTranslation {
  key:string;
  params?:any;
}

@Injectable({
  providedIn: 'root'
})
export  class KiiTranslateService  {
  /**Observable that returns current language changes */  
  public onChange = new Subject<string>();

  /**Observable that changes when loading process is completed */
  public onLoaded = new BehaviorSubject<boolean>(false);

  private _onLoaded : boolean = false;
  
  /**Current language in utilization, set by default already */
  private currentLang : string;


  /**Contains the current loaded contexts */
  public contextLoaded:any = {};

  /**Contains the language context required so that when we change language we load any missing context */
  public requiredContext:string[] = ['main'];

  /**Contains the current translations table per language */
  public translations:any = {};

  private subscr;
  private subscrGetTrans

  /**All languages that can potentially be used, use the environment to select a subset */
  private kiiLanguages : IKiiLanguage[] = [
    {name: "Francais",
     iso : "fr",
     code : "FR" },
    {name: "English",
     iso : "en",
     code: "GB"
    },  
    {name: "Español",
     iso : "es",
     code: "ES"
    },
    {name: "Català",
     iso : "ca",
     code: "CA"
    }];

  constructor(
    @Optional() @Inject(REQUEST) private _request: Request,
    @Inject(PLATFORM_ID) private platform: any,
    private transfer : TransferState,
    private http: HttpClient,
    private router: Router,
    private location:Location
    ) { 
        this.currentLang = this.get();
        //Handle back/forth and change languages
        this.subscr = this.location.subscribe(res => {
          let lang = this.getFromUrl(res.url);
          if (lang != this.currentLang) {
            this.changeLanguage(lang);
          } 
        })
    }


  /**Changes language */
  public changeLanguage(lang:string) {
    this.currentLang = this.sanitize(lang);
    this.loadTranslation(this.requiredContext,true);
    this.router.navigate(['/'+this.getCurrent()+'/' +this.router.url.slice(4)]);
  }


  /**Returns current language loaded */
  getCurrent() {
    return this.currentLang;
  }

  /**Returns the supported languages as defined in the environment variables*/
  getSupportedLanguages() {
    let supported = [];
    for (let iso of environment.languages) {
      supported.push(this.kiiLanguages.find(obj => obj.iso == iso))
    }
    return supported;
  }

  /**Sanitize the language, if is wrong we return the default */
  private sanitize(lang:string) {
    const lf = this.getSupportedLanguages().find(obj => obj.iso == lang);
    return lf?lf.iso:environment.languages[0];
  }

  /**Gets the language code from an iso */
  getCode(iso:string) {
    let lang = this.getSupportedLanguages().find(obj => obj.iso == iso);
    return lang.code;
  }

  /**Returns the language set as default in the app */
  getDefault() {
      return environment.languages[0];
  }


  /**Creates context item */
  private createContext(contextName:string) {
    if (!this.contextLoaded[this.currentLang])
        this.contextLoaded[this.currentLang] = [];
    if (!this.isContextAvailable(contextName))
        this.contextLoaded[this.currentLang].push(contextName);     
  }

  /**Checks if the context is already been loaded */
  private isContextAvailable(context:string) {
    if (!this.contextLoaded[this.currentLang])
      return false;
    else
      return this.contextLoaded[this.currentLang].indexOf(context)>-1?true:false;  
  }

  /**Sets the required context for the module */
  public setRequiredContext(context:string[]) {
    this.getLangFromBrowser();

    this.requiredContext = context;
    this.loadTranslation(context);
  }

  /**Loads the contexts that are required for the module */
  private loadTranslation(context:string[], isLanguageChange:boolean = false)  {
        //Loads any missing context
        let wait :Observable<any>[] = [];
        for (let ctx of context) {
          //If context already available do nothing
          if (this.isContextAvailable(ctx)) {
            //Notify pipes !
            this.onLoaded.next(!this._onLoaded);
          } else {
            //Load context
            if (isPlatformBrowser(this.platform))  
              wait.push(this.loadContextFromHttp(ctx));
            else
              wait.push(this.loadContextFromFile(ctx));
          }
        }
        for (let ctx of context) { this.createContext(ctx); }
        forkJoin(wait).subscribe(results => {
            for (let res of results) {
                if (!this.translations[this.currentLang]) this.translations[this.currentLang] = res;
                else this.translations[this.currentLang] = Object.assign({},this.translations[this.currentLang],res);
            }
            //Notify pipes that we have completed loading
            this.onLoaded.next(!this._onLoaded);
            if (isLanguageChange) {
              this.onChange.next(this.currentLang);
            }
            //console.log("Loaded",this.translations);
        })
  }

  public reload() {
    this.onLoaded.next(!this._onLoaded);
  }

  /**Loads the context from the TransferState if exists */
  private loadContextFromTrasferState(contextName:string):Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' + contextName + this.currentLang);
    const data = this.transfer.get(key, null);
    return data;
  }


  /**Loads context from a file and saves it in the state transfer */
  private loadContextFromFile(contextName:string) :Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' +contextName + this.currentLang);
    const data = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${this.currentLang}/${contextName}.json`, 'utf8'));
    this.transfer.set(key, data);
    if (data)
      return Observable.create(observer => {
        observer.next(data);
        observer.complete();
      });
    else 
        return of({});  
  }

  private loadContextFromHttp(contextName:string) : Observable<any> {
    const data = this.loadContextFromTrasferState(contextName);
    if (data)
      return Observable.create(observer => {
        observer.next(data);
        observer.complete();
      });
    else {  
      const path = "/assets/i18n/"+this.currentLang + "/" + contextName + ".json";
      return this.http.get(path).pipe(catchError(res => {
        return of({});
      }));
      return of({});

    }
  }

  /**Checks if translation is in transfer table if not, get from http */
  /*private getTranslation(lang: string) {
    if (this.translations[lang]) return this.translations[lang];
    return {};
  }*/

  /**Gets current translated value */
  getTranslation(keys : IKiiTranslation[]) {
    let initial : any ={};
    for (let elem of keys) {
        initial[elem.key] = "";
    }
    let result  = new BehaviorSubject(initial);
    this.subscrGetTrans = this.onLoaded.subscribe(res=> {
      if (this.translations[this.getCurrent()]) {
        let tmp : any = {};
        for (let elem of keys) {
          let str = "";
          if (this.translations[this.getCurrent()][elem.key]) {
            str  = this.translations[this.getCurrent()][elem.key];
            if (elem.params)
              for (let [key, value] of Object.entries(elem.params)) {
                let regex = new RegExp("\{\{"+key +"\}\}");
                str = str.replace(regex,String(value));
              }
          }
          tmp[elem.key] = str;
        }
        result.next(tmp);
      }
    })
    return result;
  }




  /**Returns browser lang and if not supported the default */
  public getLangFromBrowser() {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return environment.languages[0];
    }

    let browserLang: any = window.navigator.languages ? window.navigator.languages[0] : null;
    browserLang = browserLang || window.navigator.language;

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }
    return this.sanitize(browserLang);
  }


  /**Gets from url the language from /ca/ or /en/... */
  private getFromUrl(url:string){
    if (url) {
        const found = url.match(/\/[a-z][a-z]\//g);
        if (found)
            if (found[0]) {
                return found[0].replace(/\//gi, '');
            }
    }
    return null;
  }

  /**Returns lang based on request headers */
  private getLangFromRequest() {
       //parse from request
       let lang = this.getFromUrl(this._request.url);
       if (lang) return lang;
       //parse from referrer as this fixes oauth2
       lang = this.getFromUrl(this._request.headers['referer']); 
       if (lang) return lang;
       //Try from headers if above failed from headers
       try {
         lang = this._request.headers['accept-language'].substring(0, 2);
         lang = this.sanitize(lang);
       } catch(error) {
         lang = environment.languages[0];
       }
       return lang;
  }


  /**Returns language that should be used initially */
  public get() {
    if (isPlatformBrowser(this.platform)) {
      let lang = this.getFromUrl(window.location.href);
      if (lang) return this.sanitize(lang);
      return this.getLangFromBrowser();
    } else {
      let lang = this.getLangFromRequest();
      return lang;
    }
  }

  ngOnDestroy() {
    if (this.subscr) this.subscr.unsubscribe();
    if (this.subscrGetTrans) this.subscrGetTrans.unsubscribe();
  }
}