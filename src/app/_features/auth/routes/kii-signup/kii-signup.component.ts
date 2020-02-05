import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kii-signup',
  templateUrl: './kii-signup.component.html',
  styleUrls: ['./kii-signup.component.scss']
})
export class KiiSignupComponent extends KiiBaseAbstract implements OnInit {

  isLoading:boolean = false;
  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiApiAuth: KiiApiAuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
    ) { super()  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);
  }

  onSubmit(value:any) {
    console.log("Submitting",value);
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.addSubscriber(
        this.kiiApiAuth.signup(value).subscribe(res => {
          this.router.navigate([""]); //Go back home
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        })

      )
    }
  }
}
