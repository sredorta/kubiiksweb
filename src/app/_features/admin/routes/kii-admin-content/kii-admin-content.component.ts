import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { Setting } from 'src/app/_features/main/models/setting';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { environment } from 'src/environments/environment';
import { KiiAdminPageService } from '../../services/kii-admin-page.service';
import { Page } from 'src/app/_features/main/models/page';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';
import { KiiAdminCathegoryService } from '../../services/kii-admin-cathegory.service';
import { Cathegory } from '../../models/cathegory';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { Article } from 'src/app/_features/main/models/article';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';


@Component({
  selector: 'kii-admin-content',
  templateUrl: './kii-admin-content.component.html',
  styleUrls: ['./kii-admin-content.component.scss']
})
export class KiiAdminContentComponent extends KiiBaseAbstract implements OnInit {


  /**When we are loading data */
  isDataLoading:boolean =true;

  /**Contains available article cathegories */
  cathegories :Cathegory[] = [];

  /**Contains current articles */
  selectedArticles : Article[] = [];

  /**When a cathegory has been selected */
  selectedCathegory : string = null;

  /**Required icons */
  icons : any = {
    add: faPlusSquare
  }

  constructor(
    private translate: KiiTranslateService,
    private cathegory: KiiAdminCathegoryService,
    private articlesAdmin : KiiAdminArticleService,
    private articlesMain : KiiMainArticleService,

    ) { 
    super();
  }

  ngOnInit() {
    this.translate.setRequiredContext(['main','auth','form','admin']);
    //Get all available cathegories
    this.addSubscriber(
      this.cathegory.load().subscribe(res => {
        console.log("Cathegories", res);
        this.cathegories = res;
        this.isDataLoading = false;
      },() => this.isDataLoading = false)
    )

    this.addSubscriber(
      this.articlesMain.onChange.subscribe(res => {
        console.log("DETECTED CHANGES ON ARTICLES !!!",this.articlesAdmin.getByCathegory(this.selectedCathegory));
        if (this.selectedCathegory)
          this.selectedArticles = this.articlesAdmin.getByCathegory(this.selectedCathegory);
      })
    )

  }

  onCathegoryChange(data:MatSelectChange) {
    console.log("SELECTED",data.value);
    this.selectedCathegory = data.value;
    this.selectedArticles = this.articlesAdmin.getByCathegory(data.value);
    console.log(this.articlesAdmin.getByCathegory(this.selectedCathegory));
  }

  /**Create new article from selected cathegory */
  onCreate() {
    console.log("OnCreate !");
    this.addSubscriber(
      this.articlesAdmin.create(this.selectedCathegory).subscribe(res => {
        this.articlesMain.value().push(res);
        this.articlesMain.set(this.articlesMain.value());
        console.log("Created new Article",res);
      })
    )
  }

}
