import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Router } from '@angular/router';
import { KiiMainStatsService } from 'src/app/_features/main/services/kii-main-stats.service';
import { StatAction } from 'src/app/_features/main/models/stat';
import { Location } from '@angular/common';

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
    private kiiAuth: KiiMainUserService, 
    private router: Router,
    private location : Location,
    private stats: KiiMainStatsService,
  ) {super(); }

  ngOnInit() {
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

  installApp() {
    //Need to really install the app with pwa service !
    this.stats.send(StatAction.APP_INSTALL,null);
  }

  goBack() {
    this.location.back();
  }

}
