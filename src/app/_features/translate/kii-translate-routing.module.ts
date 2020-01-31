import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { KiiAppComponent } from '../main/components/kii-app/kii-app.component';

//We dynamically change the routing by adding the root routes of each language

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class KiiTranslateRoutingModule {
  constructor(private router : Router) {
    console.log("KII TRANSLATE ROUTING constructor")
    let routes: Routes = [{ path: '',  redirectTo: environment.languages[0], pathMatch:'full' }];
    for (let lang of environment.languages) {
        routes.push({path:lang, children: this.router.config});
    }
    //Add dynamically the routes
    this.router.resetConfig(routes);
    console.log(this.router.config);
  }
 }
