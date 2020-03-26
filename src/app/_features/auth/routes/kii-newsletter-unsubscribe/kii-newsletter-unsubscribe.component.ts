import { Component, OnInit } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Router, ActivatedRoute } from '@angular/router';
import { KiiAuthUserService } from '../../services/kii-auth-user.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';

@Component({
  selector: 'kii-newsletter-unsubscribe',
  templateUrl: './kii-newsletter-unsubscribe.component.html',
  styleUrls: ['./kii-newsletter-unsubscribe.component.scss']
})
export class KiiNewsletterUnsubscribeComponent extends KiiBaseAbstract implements OnInit {

  isLoading:boolean = false;

  email:string = null;

  constructor(
    private route: ActivatedRoute, 
    private kiiTrans: KiiTranslateService,
    private router : Router,
    private kiiAuth: KiiMainUserService,
    private kiiApiAuth: KiiAuthUserService
    ) {super();}

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth', 'form']);
    this.addSubscriber(
      this.route.queryParams.subscribe(params => {
        if (this.hasValidParams(params)) {
          this.email = params['email'];
        }
      })
    )
  }

  onSubmit() {
    if (this.email) {
      this.isLoading = true;
      this.addSubscriber(
        this.kiiApiAuth.unsubscribeNews(this.email).subscribe(res=> {
          this.isLoading = false;
          this.router.navigate([""]);  
        }, () => this.router.navigate([""]))
      )
    }
  }

  /**Checks that parameters are valid */
  hasValidParams(params:any) {
    if (!params['email']) return false;
    return true;
  }

}
