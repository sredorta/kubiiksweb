////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule } from '@angular/common/http';
import { KiiTranslateModule } from 'src/app/_features/translate/kii-translate.module';
import { KiiMainModule } from 'src/app/_features/main/kii-main.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { KiiFormModule } from 'src/app/_features/form/kii-form.module';
import { KiiContactFormComponent } from './components/kii-contact-form/kii-contact-form.component';
import { KiiContactThemeComponent } from './components/kii-contact-theme/kii-contact-theme.component';
import { KiiOsmComponent } from './components/kii-osm/kii-osm.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientJsonpModule,
    //JSON-LD
    NgxJsonLdModule,
    KiiTranslateModule.forChild(),
    KiiMainModule,
    KiiFormModule,
    ContactRoutingModule,
  ],
  declarations: [
    KiiOsmComponent,
    KiiContactFormComponent,
    KiiContactThemeComponent,
    ContactComponent
  ],
  providers:[
  ],
  exports:[
  ]
})
export class ContactModule { 
}