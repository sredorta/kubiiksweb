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
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiLegalRoutingModule } from './kii-legal-routing.module';
import { KiiCookiesPageComponent } from './routes/kii-cookies-page/kii-cookies-page.component';
import { KiiUserDataPageComponent } from './routes/kii-user-data-page/kii-user-data-page.component';
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiMainModule,
    KiiTranslateModule.forChild(),
    KiiLegalRoutingModule,
  ],
  declarations: [
    KiiCookiesPageComponent,
    KiiUserDataPageComponent,
  ],
  providers:[],
  exports:[
  ]
})
export class KiiLegalModule { 


}
