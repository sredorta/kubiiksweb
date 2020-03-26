import { Component, OnInit } from '@angular/core';
import { INewsletter, KiiMainNewsletterService } from '../../services/kii-main-newsletter.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { StatAction } from '../../models/stat';
import { KiiMainStatsService } from '../../services/kii-main-stats.service';
import { KiiMainArticleService } from '../../services/kii-main-article.service';

@Component({
  selector: 'kii-newsletter',
  templateUrl: './kii-newsletter.component.html',
  styleUrls: ['./kii-newsletter.component.scss']
})
export class KiiNewsletterComponent extends KiiBaseAbstract implements OnInit {

  loading : boolean = false;

  constructor(
    private kiiApiNews : KiiMainNewsletterService, 
    private stats: KiiMainStatsService,
    public articles: KiiMainArticleService) { super(); }

  ngOnInit() {
  }

  register(value:INewsletter) {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiNews.subscribeNews(value).subscribe(res => {
        this.stats.send(StatAction.NEWSLETTER,null);
      }, error => {
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    )
  }

}
