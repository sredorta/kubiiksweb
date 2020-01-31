import { BrowserModule, TransferState, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KiiTranslateModule } from './_features/translate/kii-translate.module';
import { KiiTranslateService } from './_features/translate/services/kii-translate.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KiiMainModule } from './_features/main/kii-main.module';
import { KiiMainRoutingModule } from './_features/main/kii-main-routing.module';
import { KiiTranslatePipe } from './_features/translate/pipes/kii-translate.pipe';
import { AppRoutingModule } from './app-routing.module';
import { KiiAppComponent } from './_features/main/components/kii-app/kii-app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    KiiMainModule,
    KiiTranslateModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents: [KiiAppComponent],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { 
  constructor(private kiiTrans : KiiTranslateService, private router: Router) {
    console.log("CONSTRUCTOR APP_MODULE");
  }
}
