////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatMenuModule, MatSliderModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiEmailRoutingModule } from './kii-email-routing.module';
import { KiiEmailTemplateComponent } from './components/kii-email-template/kii-email-template.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSliderModule,
    FontAwesomeModule,
    KiiEmailRoutingModule,
  ],
  declarations: [
    KiiEmailTemplateComponent
  ],
  entryComponents:[],
  providers:[
  ],
  exports:[
    KiiEmailTemplateComponent
  ]
})
export class KiiEmailModule { 
}
