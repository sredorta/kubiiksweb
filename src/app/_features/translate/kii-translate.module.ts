////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { KiiTranslateService } from './services/kii-translate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KiiTranslatePipe } from './pipes/kii-translate.pipe';
import { KiiLanguageSelectorComponent } from './components/kii-language-selector/kii-language-selector.component';
import {
  MatButtonModule,
  MatMenuModule,
} from '@angular/material';
import { KiiTranslateRoutingModule } from './kii-translate-routing.module';
import { KiiTranslateRoutePipe } from './pipes/kii-translate-route.pipe';
import { KiiHttpLangInterceptor } from './utils/kii-http-lang-interceptor';



@NgModule({
  imports: [
    CommonModule,
    KiiTranslateRoutingModule,
    [
      MatMenuModule,
      MatButtonModule
    ]
  ],
  declarations: [
    KiiTranslatePipe,
    KiiTranslateRoutePipe,
    KiiLanguageSelectorComponent,
  ],
  providers:[KiiTranslateService],
  exports:[
    KiiLanguageSelectorComponent,
    KiiTranslatePipe,
    KiiTranslateRoutePipe
  ]
})
export class KiiTranslateModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: KiiTranslateModule,
      providers: [
        KiiTranslateService,
        KiiTranslatePipe,
        KiiTranslateRoutePipe,
        { provide: HTTP_INTERCEPTORS, useClass: KiiHttpLangInterceptor, multi: true }
      ],
    }
  }

  //Providers available only on child routes, services will have their own instance !
  static forChild(): ModuleWithProviders {
    return {
      ngModule: KiiTranslateModule,
      providers: [
        KiiTranslatePipe,
        KiiTranslateRoutePipe

      ],
    }
  }
 }
