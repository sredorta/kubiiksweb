import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { KiiAppComponent } from '../main/components/kii-app/kii-app.component';
import { KiiTranslateService } from './services/kii-translate.service';

//We dynamically change the routing by adding the root routes of each language

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class KiiTranslateRoutingModule {
  constructor(private router : Router, private kiiTrans: KiiTranslateService) {
    console.log("KII TRANSLATE ROUTING constructor")
    let routes: Routes = [{ path: '',  redirectTo: this.kiiTrans.getLangFromBrowser(), pathMatch:'full' }];
    for (let lang of environment.languages) {
        routes.push({path:lang, children: this.router.config});
    }
    //Add dynamically the routes
    this.router.resetConfig(routes);
    console.log(this.router.config);
  }
 }
