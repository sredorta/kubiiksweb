import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from '../../models/user';
import { KiiAuthService } from '../../services/kii-auth.service';

@Component({
  selector: 'kii-toolbar',
  templateUrl: './kii-toolbar.component.html',
  styleUrls: ['./kii-toolbar.component.scss']
})
export class KiiToolbarComponent extends KiiBaseAbstract implements OnInit {
  loggedInUser: User = new User(null);
  icons = [];
  constructor(private kiiAuth: KiiAuthService) { super() }

  ngOnInit() {
    this.icons['bell'] = faBell;
    this.icons['login'] = faSignInAlt;
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
  }

}