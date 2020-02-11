import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { environment } from 'src/environments/environment';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
@Component({
  selector: 'kii-passports',
  templateUrl: './kii-passports.component.html',
  styleUrls: ['./kii-passports.component.scss']
})
export class KiiPassportsComponent extends KiiBaseAbstract implements OnInit {

  icon  = [];

  constructor() { 
    super();
    this.icon['facebook'] = faFacebookF;
    this.icon['google'] = faGoogle;
  }

  ngOnInit() {

  }
  /**Returns the address that is required in href to trigger the fb passport */
  getOAuthAddress(type:string) {
    console.log("OAUTH ADDRESS:",environment.apiExtURL + '/auth/' + type)
    return environment.apiExtURL + '/auth/' + type;
  }

}
