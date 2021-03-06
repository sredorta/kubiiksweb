import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { KiiTranslateService } from './_features/translate/services/kii-translate.service';
import { Router } from '@angular/router';
import { KiiTranslateModule } from './_features/translate/kii-translate.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KiiMainModule } from './_features/main/kii-main.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    KiiMainModule,
    KiiTranslateModule.forRoot()
],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
