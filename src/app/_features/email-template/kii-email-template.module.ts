////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { KiiEmailTemplateRoutingModule } from './kii-email-template-routing.module';
import { KiiEmailItemComponent } from './components/kii-email-item/kii-email-item.component';
import { KiiEmailEditorComponent } from './components/kii-email-editor/kii-email-editor.component';
import { KiiEmailTemplateService } from './services/kii-email-template.service';
import { KiiEmailToolbarComponent } from './components/kii-email-toolbar/kii-email-toolbar.component';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KiiEmailWidgetComponent } from './components/kii-email-widget/kii-email-widget.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule,
    KiiEmailTemplateRoutingModule,
  ],
  declarations: [
    KiiEmailWidgetComponent,
    KiiEmailToolbarComponent,
    KiiEmailItemComponent,
    KiiEmailEditorComponent,
  ],
  entryComponents:[],
  providers:[
    KiiEmailTemplateService
  ],
  exports:[
    KiiEmailEditorComponent
  ]
})
export class KiiEmailTemplateModule { 
}
