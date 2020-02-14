import { Component, OnInit, Inject, PLATFORM_ID, Input, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { IFooterContact } from 'src/app/_features/main/components/kii-footer/kii-footer.component';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser : User = new User(null);

  @Input() details : IFooterContact = null;

  icons = [];

  constructor( private kiiAuth: KiiMainUserService, private kiiSettings: KiiMainSettingService) { 
    super();
    this.icons['phone'] = faPhone;
    this.icons['email'] = faAt;
    this.icons['address'] =faMapMarkerAlt;

  }

  ngOnInit() {
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.details)
      this.details = changes.details.currentValue;
  }

  logout() {
    this.kiiAuth.logout();
  }

}
