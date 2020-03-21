import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';

@Component({
  selector: 'kii-email-template',
  templateUrl: './kii-email-template.component.html',
  styleUrls: ['./kii-email-template.component.scss']
})
export class KiiEmailTemplateComponent  implements OnInit {
  /**Input email data to edit */
  @Input() json : any = null;

  constructor() {  }

  ngOnInit() {
    console.log("JSON:",this.json)
  }

}
