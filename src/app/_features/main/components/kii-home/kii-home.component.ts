import { Component, OnInit } from '@angular/core';
import { KiiMainDataService } from '../../services/kii-main-data.service';
import { Router } from '@angular/router';
import { KiiMainSettingService } from '../../services/kii-main-setting.service';
import { KiiMainPageService } from '../../services/kii-main-page.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-home',
  templateUrl: './kii-home.component.html',
  styleUrls: ['./kii-home.component.scss']
})
export class KiiHomeComponent extends KiiBaseAbstract implements OnInit {

  constructor(private kiiData: KiiMainDataService, 
              private pages: KiiMainPageService,
              private settings: KiiMainSettingService,
              private router : Router) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.pages.onChange.subscribe(res => {
        if (this.pages.hasPage('home'))
          this.kiiData.seo(this.pages.getByKey('home'), this.router.url);
      })
    )
  }

}
