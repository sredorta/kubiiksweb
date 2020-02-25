////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KiiBottomSheetComponent } from './components/kii-bottom-sheet/kii-bottom-sheet.component';
import { KiiBottomSheet } from './services/kii-bottom-sheet.service';
import { KiiAnchorBottomSheetRefDirective } from './directives/kii-anchor-bottom-sheet-ref-directive';



//TODO Reduce list to the strict minimum used in common feature components


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    KiiBottomSheetComponent,
    KiiAnchorBottomSheetRefDirective
  ],
  entryComponents: [KiiBottomSheetComponent],
  providers:[
  ],
  exports:[
    KiiBottomSheetComponent
  ]
})
export class KiiBottomSheetModule { }
