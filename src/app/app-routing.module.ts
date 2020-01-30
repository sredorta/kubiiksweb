import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiTransComponent } from './_features/translate/components/kii-trans/kii-trans.component';
import { environment } from 'src/environments/environment.prod';

//Create dynamically all the paths for each language
let routes: Routes = [
  { path: '',  redirectTo: environment.languages[0], pathMatch:'full' }];
for (let lang of environment.languages) {
    routes.push({path:lang, component: KiiTransComponent});
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
