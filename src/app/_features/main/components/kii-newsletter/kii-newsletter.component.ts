import { Component, OnInit } from '@angular/core';
import { INewsletter, KiiApiNewsletterService } from '../../services/kii-api-newsletter.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-newsletter',
  templateUrl: './kii-newsletter.component.html',
  styleUrls: ['./kii-newsletter.component.scss']
})
export class KiiNewsletterComponent extends KiiBaseAbstract implements OnInit {

  loading : boolean = false;

  constructor(private kiiApiNews : KiiApiNewsletterService) { super(); }

  ngOnInit() {
  }

  register(value:INewsletter) {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiNews.subscribeNews(value).subscribe(res => {
        console.log(res);
      }, error => {
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    )
  }

}
