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
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { KiiFormModule } from '../form/kii-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiTableModule } from '../table/kii-table.module';
import { KiiEmailBuilderRoutingModule } from './kii-email-builder-routing.module';
import { KiiEmailEditorComponent } from './components/kii-email-editor/kii-email-editor.component';
import { KiiEmailToolbarComponent } from './components/kii-email-toolbar/kii-email-toolbar.component';
import { KiiEmailBlockComponent } from './components/kii-email-block/kii-email-block.component';
import { KiiEmailBuilderService } from './services/kii-email-builder.service';
import { KiiEmailItemComponent } from './components/kii-email-item/kii-email-item.component';
import { KiiEmailCellComponent } from './components/kii-email-cell/kii-email-cell.component';
import { KiiEmailCommonToolbarComponent } from './components/kii-email-common-toolbar/kii-email-common-toolbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiFormModule,
    KiiTableModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    KiiEmailBuilderRoutingModule,
  ],
  declarations: [
    KiiEmailCellComponent,
    KiiEmailItemComponent,
    KiiEmailCommonToolbarComponent,
    KiiEmailToolbarComponent,
    KiiEmailBlockComponent,
    KiiEmailEditorComponent,
  ],
  entryComponents:[KiiEmailBlockComponent],
  providers:[
    KiiEmailBuilderService
  ],
  exports:[
    KiiEmailEditorComponent
  ]
})
export class KiiEmailBuilderModule { 
}
