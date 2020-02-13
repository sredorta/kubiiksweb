import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { Setting } from 'src/app/_features/main/models/setting';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser : User = new User(null);
  phone:string = "";
  email:string = "";
  addressStreet:string= "";
  addressPostal:string= "";
  addressLocality:string="";
  addressCountry:string="";

  constructor( private kiiAuth: KiiMainUserService, private kiiSettings: KiiMainSettingService) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.addSubscriber(
      this.kiiSettings.onChange.subscribe(res => {
        this.phone = Setting.getByKey('telephone',this.kiiSettings.getValue()).value;
        this.email = Setting.getByKey('email',this.kiiSettings.getValue()).value;
        this.addressStreet = Setting.getByKey('addressStreet',this.kiiSettings.getValue()).value;
        this.addressPostal = Setting.getByKey('addressPostal',this.kiiSettings.getValue()).value;
        this.addressLocality = Setting.getByKey('addressLocality',this.kiiSettings.getValue()).value;
        this.addressCountry = Setting.getByKey('addressCountry',this.kiiSettings.getValue()).value;
        //TODO: MOVE THIS PART IN KII-FOOTER AND PASS AS ARGUMENT !
        console.log("RECIEVED PHONE:",this.phone);

      })
    )
  }

  logout() {
    this.kiiAuth.logout();
  }

}
