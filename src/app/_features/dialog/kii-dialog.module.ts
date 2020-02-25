////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KiiDialogComponent } from './components/kii-dialog/kii-dialog.component';
import { KiiDialog } from './services/kii-dialog.service';
import { KiiAnchorRefDirective } from './directives/kii-anchor-ref-directive';



//TODO Reduce list to the strict minimum used in common feature components


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    KiiDialogComponent,
    KiiAnchorRefDirective
  ],
  entryComponents: [KiiDialogComponent],
  providers:[
  ],
  exports:[
  ]
})
export class KiiDialogModule { }
