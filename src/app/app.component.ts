import { Component } from '@angular/core';
import { KiiTranslateService } from './_features/translate/services/kii-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kubiiksweb';
  constructor() {
  }
}
