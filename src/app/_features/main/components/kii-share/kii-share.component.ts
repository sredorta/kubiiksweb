import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { ShareService } from '@ngx-share/core';


@Component({
  selector: 'kii-share',
  templateUrl: './kii-share.component.html',
  styleUrls: ['./kii-share.component.scss']
})
export class KiiShareComponent implements OnInit {
  /**Route to point for the link */
  @Input() route : string = null;
  icons = {
    facebook:faFacebookF, 
    twitter:faTwitter, 
    linkedin:faLinkedinIn,
    whatsapp:faWhatsapp, 
    telegram:faTelegramPlane,
    email:faEnvelope,
  };
  constructor(private router: Router,public share: ShareService) { 
  }

  ngOnInit() {
  }

  getUrl() {
    if (!this.route) return environment.mainExtURL + this.router.url;
    return environment.mainExtURL + this.route;
  }

  sendStats(social:string) {
    //TODO Send stats here !
  }

  myGet(event) {
  }
}
