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
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiInputErrorDirective } from './directives/kii-input-error.directive';
import { KiiInputDefaultValueDirective } from './directives/kii-input-default-value.directive';
import { KiiInputDigitOnlyDirective } from './directives/kii-input-digit-only.directive';
import { KiiDisableControlDirective } from './directives/kii-disable-control.directive';
import { KiiConfirmDialogComponent } from './components/kii-confirm-dialog/kii-confirm-dialog.component';
import { KiiImageUploadComponent } from './components/kii-image-upload/kii-image-upload.component';
import { KiiApiUploadFileService } from './services/kii-api-upload-image.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    [  MatAutocompleteModule, //MATERIAL DESIGN
      MatInputModule,
      MatTooltipModule,
      MatSelectModule,
      MatOptionModule,
      MatChipsModule,
      MatProgressBarModule
    ],
  ],
  declarations: [
    KiiDisableControlDirective,
    KiiInputErrorDirective,
    KiiInputDefaultValueDirective,
    KiiInputDigitOnlyDirective,
    KiiConfirmDialogComponent,
    KiiImageUploadComponent
  ],
  entryComponents: [KiiConfirmDialogComponent],
  providers:[
    KiiApiUploadFileService
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatProgressBarModule,
    KiiDisableControlDirective,
    KiiInputErrorDirective,
    KiiInputDefaultValueDirective,
    KiiInputDigitOnlyDirective,
    KiiConfirmDialogComponent,
    KiiImageUploadComponent
  ]
})
export class KiiFormModule { }
