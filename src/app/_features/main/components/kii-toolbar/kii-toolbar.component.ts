import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from '../../models/user';
import { KiiMainUserService } from '../../services/kii-main-user.service';
import { KiiMainNetworkService } from '../../services/kii-main-network.service';
import { faPlane } from '@fortawesome/free-solid-svg-icons/faPlane';

@Component({
  selector: 'kii-toolbar',
  templateUrl: './kii-toolbar.component.html',
  styleUrls: ['./kii-toolbar.component.scss']
})
export class KiiToolbarComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser: User = new User(null);
  offline:boolean = false;
  icons :any = {
    bell: faBell,
    login: faSignInAlt,
    admin:faCog,
    offline: faPlane
  };
  constructor(private kiiAuth: KiiMainUserService, private network: KiiMainNetworkService) { 
    super() 
  }

  ngOnInit() {
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.addSubscriber(
      this.network.offline.subscribe(res => {
        console.log("SETTING OFFLINE TO",res);
        this.offline = res;
      })
    )
  }

}
