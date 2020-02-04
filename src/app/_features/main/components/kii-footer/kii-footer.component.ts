import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faInstagram}  from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';


@Component({
  selector: 'kii-footer',
  templateUrl: './kii-footer.component.html',
  styleUrls: ['./kii-footer.component.scss']
})
export class KiiFooterComponent implements OnInit {
  
  links =
    [ {
        name: 'facebook',
        link: 'https://www.google.com',
        icon: faFacebookF
      },
      {
        name: 'twitter',
        link: 'https://www.google.com',
        icon: faTwitter
      },
      {
        name: 'linkedin',
        link: 'https://www.google.com',
        icon: faLinkedinIn
      },
      {
        name: 'google',
        link: 'https://www.google.com',
        icon: faGooglePlusG
      },
      {
        name: 'youtube',
        link: 'https://www.google.com',
        icon: faYoutube
      }
    ];

  constructor() { }

  ngOnInit() {
  }

  onClick(social:string) {
    //TODO: Add stats here !
  }

}
