import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiLoginComponent } from './routes/kii-login/kii-login.component';
import { KiiSignupComponent } from './routes/kii-signup/kii-signup.component';
import { KiiResetPasswordComponent } from './routes/kii-reset-password/kii-reset-password.component';
import { KiiEmailValidateComponent } from './routes/kii-email-validate/kii-email-validate.component';
import { KiiLoginOauthComponent } from './routes/kii-login-oauth/kii-login-oauth.component';


const routes: Routes = [
  { path: '',  component: KiiLoginComponent },
  { path: 'login',  component: KiiLoginComponent },
  { path: 'signup', component:KiiSignupComponent},
  { path: 'reset-password', component:KiiResetPasswordComponent},
  { path: 'validate-email', component:KiiEmailValidateComponent},
  {
    path: 'login/validate/:token',
    component: KiiLoginOauthComponent,
    data: { skipRouteLocalization: true },
    //runGuardsAndResolvers: 'always',
    //canActivate: [UnregisteredGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAuthRoutingModule { }
