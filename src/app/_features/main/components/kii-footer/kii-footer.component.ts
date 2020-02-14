import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faInstagram}  from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { KiiMainStatsService } from '../../services/kii-main-stats.service';
import { StatAction } from '../../models/stat';
import { KiiMainSettingService } from '../../services/kii-main-setting.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Setting } from '../../models/setting';


export interface IFooterContact {
    phone : string,
    email: string,
    addressStreet:string,
    addressPostal:string,
    addressLocality:string,
    addressCountry:string
}


@Component({
  selector: 'kii-footer',
  templateUrl: './kii-footer.component.html',
  styleUrls: ['./kii-footer.component.scss']
})
export class KiiFooterComponent extends KiiBaseAbstract implements OnInit {
  
  links =
    [ {
        name: 'facebook',
        link: '',
        icon: faFacebookF
      },
      {
        name: 'twitter',
        link: '',
        icon: faTwitter
      },
      {
        name: 'linkedin',
        link: '',
        icon: faLinkedinIn
      },
      {
        name: 'google',
        link: '',
        icon: faGooglePlusG
      },
      {
        name: 'youtube',
        link: '',
        icon: faYoutube
      }
    ];

  /**Contains current settings */
  settings : Setting[] = [];  

  /**Contains company details */
  companyDetails: IFooterContact = {
    phone:"",
    email:"",
    addressCountry:"",
    addressLocality:"",
    addressPostal:"",
    addressStreet:""
  };

  constructor(
    private stats: KiiMainStatsService, 
    private kiiSettings : KiiMainSettingService
    ) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiSettings.onChange.subscribe(res => {
        for (let item of this.links) {
          item.link = this.getLink(item.name);
        }
        this.companyDetails.phone = Setting.getByKey('telephone',this.kiiSettings.getValue()).value;
        this.companyDetails.email = Setting.getByKey('email',this.kiiSettings.getValue()).value;
        this.companyDetails.addressStreet = Setting.getByKey('addressStreet',this.kiiSettings.getValue()).value;
        this.companyDetails.addressPostal = Setting.getByKey('addressPostal',this.kiiSettings.getValue()).value;
        this.companyDetails.addressLocality = Setting.getByKey('addressLocality',this.kiiSettings.getValue()).value;
        this.companyDetails.addressCountry = Setting.getByKey('addressCountry',this.kiiSettings.getValue()).value;
        this.companyDetails = {...this.companyDetails};
      })
    )
  }

  /**Gets the current link*/
  getLink(social:string) {
    return this.kiiSettings.getByKey(social).value;
  }


  onClick(social:string) {
    this.stats.send(StatAction.SOCIAL_CLICK, social);
  }

}
