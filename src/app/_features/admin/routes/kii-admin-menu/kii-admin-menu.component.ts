import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faPenNib } from '@fortawesome/free-solid-svg-icons/faPenNib';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service.js';
import { environment } from 'src/environments/environment.js';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';



@Component({
  selector: 'kii-admin-menu',
  templateUrl: './kii-admin-menu.component.html',
  styleUrls: ['./kii-admin-menu.component.scss']
})
export class KiiAdminMenuComponent extends KiiBaseAbstract implements OnInit {


  loggedInUser : User = new User(null);
  icons = [];

  constructor(
    private kiiTrans: KiiTranslateService, 
    private location : Location,
    private kiiAuth: KiiMainUserService
    ) { 
      super();
      this.icons['settings'] = faCogs;
      this.icons['users'] = faUserCog;
      this.icons['content'] = faPenNib;
      this.icons['emails'] = faAt;
      this.icons['chats'] = faComments;
      this.icons['popup'] = faWindowRestore;
      this.icons['disk'] = faSave;
      this.icons['stats'] = faChartLine;
      this.icons['bell'] = faBell;
    }



  ngOnInit() {
    this.kiiTrans.setRequiredContext(['admin']);
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
  }


  goBack() {
    this.location.back();
  }
}
