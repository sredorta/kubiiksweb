import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiLoginComponent } from './routes/kii-login/kii-login.component';
import { KiiSignupComponent } from './routes/kii-signup/kii-signup.component';
import { KiiResetPasswordComponent } from './routes/kii-reset-password/kii-reset-password.component';
import { KiiEmailValidateComponent } from './routes/kii-email-validate/kii-email-validate.component';
import { KiiLoginOauthComponent } from './routes/kii-login-oauth/kii-login-oauth.component';
import { KiiProfileComponent } from './routes/kii-profile/kii-profile.component';
import { KiiAlertsComponent } from './routes/kii-alerts/kii-alerts.component';
import { KiiEstablishPasswordComponent } from './routes/kii-establish-password/kii-establish-password.component';
import { KiiNewsletterUnsubscribeComponent } from './routes/kii-newsletter-unsubscribe/kii-newsletter-unsubscribe.component';
import { RegisteredGuard } from '../main/guards/registered.guard';
import { UnregisteredGuard } from '../main/guards/unregistered.guard';


const routes: Routes = [
  { path: '',  component: KiiLoginComponent },
  { path: 'login',  component: KiiLoginComponent,canActivate:[UnregisteredGuard] },
  { path: 'signup', component:KiiSignupComponent,canActivate:[UnregisteredGuard]},
  { path: 'reset-password', component:KiiResetPasswordComponent,canActivate:[UnregisteredGuard]},
  { path: 'establish-password', component:KiiEstablishPasswordComponent,canActivate:[UnregisteredGuard]},
  { path: 'validate-email', component:KiiEmailValidateComponent,canActivate:[UnregisteredGuard]},
  {
    path: 'login/validate/:token',
    component: KiiLoginOauthComponent,
    data: { skipRouteLocalization: true },
    canActivate:[UnregisteredGuard]
    //runGuardsAndResolvers: 'always',
    //canActivate: [UnregisteredGuard]
  },
  { path: 'profile', component:KiiProfileComponent,canActivate:[RegisteredGuard]},
  { path: 'notifications', component:KiiAlertsComponent,canActivate:[RegisteredGuard]},
  { path: 'unsubscribe',component: KiiNewsletterUnsubscribeComponent}, //Newsletter unsubscribe


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAuthRoutingModule { }
