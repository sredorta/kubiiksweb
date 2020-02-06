////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';



//TODO Reduce list to the strict minimum used in common feature components
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  //MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  //MatGridListModule,
  //MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  //MatNativeDateModule,
  MatPaginatorModule,
  //MatProgressBarModule,
  //MatProgressSpinnerModule,
  //MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  //MatSidenavModule,
  //MatSliderModule,
  //MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  //MatStepperModule,
  //MatTableModule,
  //MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KiiLoginComponent } from './routes/kii-login/kii-login.component';
import { KiiAuthRoutingModule } from './kii-auth-routing.module';
import { KiiSignupComponent } from './routes/kii-signup/kii-signup.component';
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { KiiLoginFormComponent } from './components/kii-login-form/kii-login-form.component';
import { KiiFormModule } from '../form/kii-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiPassportsComponent } from './components/kii-passports/kii-passports.component';
import { KiiResetPasswordComponent } from './routes/kii-reset-password/kii-reset-password.component';
import { KiiSignupFormComponent } from './components/kii-signup-form/kii-signup-form.component';
import { KiiEmailValidateComponent } from './routes/kii-email-validate/kii-email-validate.component';
import { KiiLoginOauthComponent } from './routes/kii-login-oauth/kii-login-oauth.component';
import { KiiOauthFormComponent } from './components/kii-oauth-form/kii-oauth-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiFormModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    KiiAuthRoutingModule,
  ],
  declarations: [
    KiiOauthFormComponent,
    KiiLoginOauthComponent,
    KiiResetPasswordComponent,
    KiiPassportsComponent,
    KiiLoginFormComponent,
    KiiLoginComponent,
    KiiSignupFormComponent,
    KiiSignupComponent,
    KiiEmailValidateComponent,
  ],
  providers:[
  ],
  exports:[
  ]
})
export class KiiAuthModule { 
}
