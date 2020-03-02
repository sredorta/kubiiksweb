import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from '../../models/user';
import { KiiMainUserService } from '../../services/kii-main-user.service';

@Component({
  selector: 'kii-toolbar',
  templateUrl: './kii-toolbar.component.html',
  styleUrls: ['./kii-toolbar.component.scss']
})
export class KiiToolbarComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser: User = new User(null);
  icons :any = {
    bell: faBell,
    login: faSignInAlt,
    admin:faCog
  };
  constructor(private kiiAuth: KiiMainUserService) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
  }

}
