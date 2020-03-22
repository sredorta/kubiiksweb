////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { KiiEmailTemplateRoutingModule } from './kii-email-template-routing.module';
import { KiiEmailEditorComponent } from './components/kii-email-editor/kii-email-editor.component';
import { KiiEmailTemplateService } from './services/kii-email-template.service';
import { MatButtonModule, MatMenuModule, MatSliderModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KiiEmailWidgetComponent } from './components/kii-email-widget/kii-email-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KiiEmailContainerToolbarComponent } from './components/kii-email-container-toolbar/kii-email-container-toolbar.component';
import { KiiEmailPreviewComponent } from './components/kii-email-preview/kii-email-preview.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KiiEditorComponent } from './components/kii-editor/kii-editor.component';



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
    CKEditorModule,
    KiiEmailTemplateRoutingModule,
  ],
  declarations: [
    KiiEmailPreviewComponent,
    KiiEditorComponent,
    KiiEmailWidgetComponent,
    KiiEmailContainerToolbarComponent,
    KiiEmailEditorComponent,
  ],
  entryComponents:[],
  providers:[
    KiiEmailTemplateService
  ],
  exports:[
    KiiEmailEditorComponent,
    KiiEmailPreviewComponent
  ]
})
export class KiiEmailTemplateModule { 
}
