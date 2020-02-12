////////////////////////////////////////////////////////////////////////////////
//Includes the minimal set of components required to show the main pages
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector, ChangeDetectorRef, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

//TODO Reduce list to the strict minimum used in common feature components
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
  MatRippleModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
  MatInputModule,
  MatBadge,
  MatBadgeModule,
  MatMenuItem,
  MatIconModule,
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { KiiHomeComponent } from './components/kii-home/kii-home.component';
import { KiiAppComponent } from './components/kii-app/kii-app.component';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { KiiMainRoutingModule } from './kii-main-routing.module';
import { RouterModule } from '@angular/router';
import { KiiBottomSheetCookiesComponent } from './components/kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { KiiFooterComponent } from './components/kii-footer/kii-footer.component';
import { KiiNewsletterComponent } from './components/kii-newsletter/kii-newsletter.component';
import { KiiSpinnerOverlayComponent } from './components/kii-spinner-overlay/kii-spinner-overlay.component';
import { KiiSpinnerComponent } from './components/kii-spinner/kii-spinner.component';
import { KiiNewsletterFormComponent } from './components/kii-newsletter-form/kii-newsletter-form.component';
import { KiiShareComponent } from './components/kii-share/kii-share.component';
import { ShareModule } from '@ngx-share/core';
import { KiiHeaderComponent } from './components/kii-header/kii-header.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KiiHttpInterceptor } from './utils/kii-http-interceptor';
import { KiiHttpErrorComponent } from './components/kii-http-error/kii-http-error.component';
import { KiiMainUserService } from './services/kii-main-user.service';
import { SidenavModule } from 'src/app/routes/sidenav/sidenav.module';
import { KiiToolbarComponent } from './components/kii-toolbar/kii-toolbar.component';
import { KiiMainStatsService } from './services/kii-main-stats.service';



@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ShareModule,
    [ 
      MatDividerModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatMenuModule,
      MatRippleModule,
      MatToolbarModule,
      MatBadgeModule,
      MatIconModule
    ],
    KiiTranslateModule.forChild(),
    RouterModule,
  ],
  declarations: [
    KiiShareComponent,
    KiiSpinnerComponent,
    KiiSpinnerOverlayComponent,
    KiiToolbarComponent,
    ToolbarComponent,
    KiiHeaderComponent,
    HeaderComponent,
    KiiFooterComponent,
    FooterComponent,
    KiiNewsletterComponent,
    KiiNewsletterFormComponent,
    HeaderComponent,
    KiiAppComponent,
    KiiBottomSheetCookiesComponent,
    KiiHomeComponent,
    KiiHttpErrorComponent
  ],
  //providers:[DeviceDetectorService,KiiInjectorService,KiiLanguageService, KiiViewTransferService],
  entryComponents:[KiiBottomSheetCookiesComponent, KiiHttpErrorComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: KiiHttpInterceptor, multi: true }
  ],
  exports:[
    KiiToolbarComponent,
    ToolbarComponent,
    KiiHeaderComponent,
    HeaderComponent,
    KiiFooterComponent,
    FooterComponent,
    KiiAppComponent,
    KiiSpinnerComponent,
    KiiSpinnerOverlayComponent,
    FontAwesomeModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class KiiMainModule { 
 static forRoot(): ModuleWithProviders {
  return {
    ngModule: KiiMainModule,
    providers: [
      KiiMainUserService, KiiMainStatsService
    ],
  }
}

//Providers available only on child routes, services will have their own instance !
static forChild(): ModuleWithProviders {
  return {
    ngModule: KiiMainModule,
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: KiiHttpInterceptor, multi: true }
    ],
  }
}
}
