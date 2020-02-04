import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiCookiesPageComponent } from './routes/kii-cookies-page/kii-cookies-page.component';
import { KiiUserDataPageComponent } from './routes/kii-user-data-page/kii-user-data-page.component';


const routes: Routes = [
  { path: '',  component: KiiCookiesPageComponent },
  { path: 'cookies',  component: KiiCookiesPageComponent },
  { path: 'user-data', component:KiiUserDataPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiLegalRoutingModule { }
