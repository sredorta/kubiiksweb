////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KiiTransComponent } from './components/kii-trans/kii-trans.component';
import { RouterModule, Routes } from '@angular/router';
import { KiiTranslateService } from './services/kii-translate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KiiTranslatePipe } from './pipes/kii-translate.pipe';
import { KiiLanguageSelectorComponent } from './components/kii-language-selector/kii-language-selector.component';
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

const routes: Routes = [
  { path: '',  component: KiiTransComponent },
  { path: 'fr',  component: KiiTransComponent },
  { path: 'es', component:KiiTransComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    [
      MatMenuModule,
      MatButtonModule
    ]
  ],
  declarations: [
    KiiTranslatePipe,
    KiiLanguageSelectorComponent,
    KiiTransComponent
  ],
  providers:[KiiTranslateService],
  exports:[
    KiiLanguageSelectorComponent,
    KiiTranslatePipe
  ]
})
export class KiiTranslateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: KiiTranslateModule,
      providers: [
        KiiTranslateService
      ],
    }
  }

  //Providers available only on child routes, services will have their own instance !
  static forChild(): ModuleWithProviders {
    return {
      ngModule: KiiTranslateModule,
      providers: []
    }
  }
 }
