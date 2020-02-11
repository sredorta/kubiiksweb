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
  MatSelectModule,
  MatOptionModule,
  MatChipsModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { KiiTranslateModule } from '../translate/kii-translate.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiTranslateModule.forChild(),
    [  MatTableModule,
      MatSortModule,
      MatPaginatorModule
    ],
  ],
  declarations: [

  ],
  entryComponents: [],
  providers:[
  ],
  exports:[
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class KiiTableModule { }
