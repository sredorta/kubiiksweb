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

//Google charts
import { GoogleChartsModule } from 'angular-google-charts';

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
import { KiiAdminThemeComponent } from './components/kii-admin-theme/kii-admin-theme.component';
import { KiiAdminSettingService } from './services/kii-admin-setting.service';
import { KiiAdminSettingsComponent } from './routes/kii-admin-settings/kii-admin-settings.component';
import { KiiSettingItemComponent } from './components/kii-setting-item/kii-setting-item.component';
import { KiiSeoFormComponent } from './components/kii-seo-form/kii-seo-form.module';
import { KiiAdminContentComponent } from './routes/kii-admin-content/kii-admin-content.component';
import { AngularEditorComponent } from './components/angular_editor/angular-editor.component';
import { AngularEditorToolbarComponent } from './components/angular_editor/angular-editor-toolbar.component';
import { AeSelectComponent } from './components/angular_editor/ae-select/ae-select.component';
import { KiiAdminArticleComponent } from './components/kii-admin-article/kii-admin-article.component';
import { KiiAdminArticleItemComponent } from './components/kii-admin-article-item/kii-admin-article-item.component';
import { KiiArticleSummaryFormComponent } from './components/kii-article-summary-form/kii-article-summary-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GoogleChartsModule.forRoot(),
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
    KiiArticleSummaryFormComponent,
    KiiAdminArticleItemComponent,
    KiiAdminArticleComponent,
    AngularEditorComponent,
    AngularEditorToolbarComponent,
    AeSelectComponent,
    KiiAdminThemeComponent,
    KiiAdminMenuComponent,
    KiiSeoFormComponent,
    KiiAdminSettingsComponent,
    KiiSettingItemComponent,
    KiiAdminStatsComponent,
    KiiAdminContentComponent,
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
