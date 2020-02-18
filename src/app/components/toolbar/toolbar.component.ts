import { Component, OnInit } from '@angular/core';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends KiiBaseAbstract implements OnInit {


  /**Contains current page for highlighting menu */
  page:string = "";

  constructor(private router: Router) { super() }

  ngOnInit() {
    this.setCurrentPage(this.router.url);
  }

  /**Returns current page */
  setCurrentPage(url:string) {
    this.page = url.replace(/\/[a-z][a-z]\//,"");
    //console.log("PAGE :", this.page);
  }

}
