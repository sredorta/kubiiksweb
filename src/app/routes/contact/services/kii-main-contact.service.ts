import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { ContactModule } from '../contact.module';


interface Scripts {
  name: string;
  src: string;
  type: 'script' | 'link';
}  
const ScriptStore: Scripts[] = [
  {name: 'osmjs', type:'script',src: 'https://openlayers.org/en/v4.6.5/build/ol.js'},
  {name: 'osmcss', type:'link', src: 'https://openlayers.org/en/v4.6.5/css/ol.css'}
];


@Injectable({
  providedIn: 'root'
})
export class KiiMainContactService {
  private scripts: any = {};

  constructor(private http:HttpClient) { 
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
          loaded: false,
          type:script.type,
          src: script.src
      };
  });
  }

  /**Send email from contact form, we expect email, subject and message as parameters */
  public contact(value:any) {
    return this.http.post<any>(environment.apiURL + '/contact/email', value);
  }


  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
        //resolve if already loaded
        if (this.scripts[name].loaded) {
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        }
        else {
            //load script
            let script;
            if (this.scripts[name].type=="script") {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            }
            if (this.scripts[name].type=="link") {
              script = document.createElement('link');
              script.rel = 'stylesheet';
              script.type = "text/css";
              script.href = "https://openlayers.org/en/v4.6.5/css/ol.css";
            }
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
  }

  /**Adds Open Street Map dependencies */
  public addOsmDependencies() {
    let node = document.createElement('script');
    node.src = "https://openlayers.org/en/v4.6.5/build/ol.js";
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);

    let nodeStyle = document.createElement('link');
    nodeStyle.id = 'client-theme';
    nodeStyle.rel = 'stylesheet';
    nodeStyle.type = "text/css";
    nodeStyle.href = "https://openlayers.org/en/v4.6.5/css/ol.css";
    document.getElementsByTagName('head')[0].appendChild(nodeStyle);

  }

}