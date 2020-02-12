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
  MatSlideToggleModule,
  MatSliderModule,
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { KiiAdminMenuComponent } from './routes/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminStatsComponent } from './routes/kii-admin-stats/kii-admin-stats.component';
import { KiiAdminRoutingModule } from './kii-admin-routing.module';
import { KiiAdminUserService } from './services/kii-admin-user.service';
import { KiiAdminUsersComponent } from './routes/kii-admin-users/kii-admin-users.component';
import { KiiFormModule } from '../form/kii-form.module';
import { KiiTableModule } from '../table/kii-table.module';
import { KiiMobileFormatPipe } from './pipes/kii-mobile-format.pipe';
import { KiiAdminPopupComponent } from './routes/kii-admin-popup/kii-admin-popup.component';
import { KiiStatsIndicatorComponent } from './components/kii-stats-indicator/kii-stats-indicator.component';
import { KiiThousandsSuffixPipe } from './pipes/kii-thousands-suffix.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiMainModule,
    KiiTranslateModule.forChild(),
    KiiFormModule,
    KiiTableModule,
    KiiAdminRoutingModule,
    [
      MatSlideToggleModule,
      MatSliderModule
    ]
  ],
  declarations: [
    KiiAdminMenuComponent,
    KiiAdminStatsComponent,
    KiiStatsIndicatorComponent,
    KiiAdminUsersComponent,
    KiiAdminPopupComponent,
    KiiMobileFormatPipe,
    KiiThousandsSuffixPipe
  ],
  providers:[KiiAdminUserService],
  exports:[
  ]
})
export class KiiAdminModule { }
