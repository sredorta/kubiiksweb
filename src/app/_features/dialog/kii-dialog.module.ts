////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KiiDialogComponent } from './components/kii-dialog/kii-dialog.component';
import { KiiDialog } from './services/kii-dialog.service';
import { KiiAnchorDialogRefDirective } from './directives/kii-anchor-dialog-ref-directive';



//TODO Reduce list to the strict minimum used in common feature components


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    KiiDialogComponent,
    KiiAnchorDialogRefDirective
  ],
  entryComponents: [KiiDialogComponent],
  providers:[
  ],
  exports:[
  ]
})
export class KiiDialogModule { }
