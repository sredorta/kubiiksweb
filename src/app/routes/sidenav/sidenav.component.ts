import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends KiiBaseAbstract implements OnInit {

  loggedInUser = new User(null);
  icons = [];

  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiAuth: KiiAuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any) {super(); }

  ngOnInit() {
    //this.kiiTrans.setRequiredContext(['main']);
    this.kiiTrans.reload();
    this.icons['close'] = faTimes;

    this.addSubscriber(this.kiiAuth.getLoggedInUser().subscribe(res => this.loggedInUser = res));
    this.kiiTrans.onLoaded.subscribe(res => {
      console.log("Translations loaded",this.kiiTrans.translations);
    })
  }

  logout() {
    this.kiiAuth.logout();
    this.router.navigate(['']);
  }

}
