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
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiMainModule } from '../main/kii-main.module';
import { KiiTranslateModule } from '../translate/kii-translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiNiceDateFormatPipe } from './pipes/kii-nice-date-format.pipe';
import { KiiInputErrorDirective } from './directives/kii-input-error.directive';
import { KiiInputDefaultValueDirective } from './directives/kii-input-default-value.directive';
import { KiiInputDigitOnlyDirective } from './directives/kii-input-digit-only.directive';
import { KiiDisableControlDirective } from './directives/kii-disable-control.directive';


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
      MatDialogModule,
      MatSelectModule,
      MatOptionModule
    ],
  ],
  declarations: [
    KiiDisableControlDirective,
    KiiInputErrorDirective,
    KiiInputDefaultValueDirective,
    KiiInputDigitOnlyDirective,
    KiiNiceDateFormatPipe
  ],
  providers:[
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    KiiDisableControlDirective,
    KiiInputErrorDirective,
    KiiInputDefaultValueDirective,
    KiiInputDigitOnlyDirective,
    KiiNiceDateFormatPipe
  ]
})
export class KiiFormModule { }
