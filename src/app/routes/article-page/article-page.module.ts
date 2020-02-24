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
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiTranslateModule } from 'src/app/_features/translate/kii-translate.module';
import { KiiMainModule } from 'src/app/_features/main/kii-main.module';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    ArticlePageRoutingModule,
  ],
  declarations: [
    ArticlePageComponent
  ],
  providers:[
  ],
  exports:[
  ]
})
export class ArticlePageModule { 
}