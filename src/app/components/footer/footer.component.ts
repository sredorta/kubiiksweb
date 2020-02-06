import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser : User = new User(null);
  constructor(@Inject(PLATFORM_ID) private platform: any, private kiiAuth: KiiAuthService) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        console.log("loggedInUser",this.loggedInUser);
      })
    )
  }

  logout() {
    this.kiiAuth.logout();
  }

}
