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
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
  MatInputModule,
} from '@angular/material';
import { KiiHomeComponent } from './components/kii-home/kii-home.component';
import { KiiAppComponent } from './components/kii-app/kii-app.component';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { KiiMainRoutingModule } from './kii-main-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    KiiTranslateModule.forChild(),
    RouterModule,
    [ MatDividerModule, 
      MatBottomSheetModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatDialogModule,
      MatListModule,
      MatMenuModule,
      MatRippleModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatTooltipModule,
    ],
  ],
  declarations: [
    KiiAppComponent,
    KiiHomeComponent
  ],
  //providers:[DeviceDetectorService,KiiInjectorService,KiiLanguageService, KiiViewTransferService],
  entryComponents:[],
  exports:[
    KiiAppComponent
  ]
})
export class KiiMainModule { 
  constructor()
 {
     console.log("KII_MAIN_MODULE CONSTRUCTOR!!!");
 }
 static forRoot(): ModuleWithProviders {
  return {
    ngModule: KiiMainModule,
    providers: [
      //KiiTranslateService
    ],
  }
}

//Providers available only on child routes, services will have their own instance !
static forChild(): ModuleWithProviders {
  return {
    ngModule: KiiMainModule,
    providers: [],
  }
}
}
