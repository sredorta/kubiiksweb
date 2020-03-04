////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';



//TODO Reduce list to the strict minimum used in common feature components
import {MatAutocompleteModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatRippleModule,
  MatTableDataSource,
  MatTableModule,
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiTranslateModule } from 'src/app/_features/translate/kii-translate.module';
import { KiiMainModule } from 'src/app/_features/main/kii-main.module';
import { KiiDemoThemeComponent } from './kii-demo-theme/kii-demo-theme.component';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DemoRoutingModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
  ],
  declarations: [
    KiiDemoThemeComponent,
    DemoComponent
  ],
  providers:[
  ],
  exports:[
  ]
})
export class DemoModule { 
}