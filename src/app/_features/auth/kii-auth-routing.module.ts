import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiLoginComponent } from './routes/kii-login/kii-login.component';
import { KiiSignupComponent } from './routes/kii-signup/kii-signup.component';


const routes: Routes = [
  { path: '',  component: KiiLoginComponent },
  { path: 'login',  component: KiiLoginComponent },
  { path: 'signup', component:KiiSignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAuthRoutingModule { }
