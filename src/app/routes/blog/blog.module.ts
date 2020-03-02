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
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { KiiBlogThemeComponent } from './kii-blog-theme/kii-blog-theme.component';
import { KiiFormModule } from 'src/app/_features/form/kii-form.module';
import { KiiPaginatorComponent } from './kii-paginator/kii-paginator.component';
import { KiiTableModule } from 'src/app/_features/table/kii-table.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    KiiFormModule,
    MatTableModule,
    BlogRoutingModule,
  ],
  declarations: [
    KiiBlogThemeComponent,
    KiiPaginatorComponent,
    BlogComponent
  ],
  providers:[
  ],
  exports:[
  ]
})
export class BlogModule { 
}