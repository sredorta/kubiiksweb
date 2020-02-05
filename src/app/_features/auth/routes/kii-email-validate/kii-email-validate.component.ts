import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-kii-email-validate',
  templateUrl: './kii-email-validate.component.html',
  styleUrls: ['./kii-email-validate.component.scss']
})
export class KiiEmailValidateComponent extends KiiBaseAbstract implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private kiiApiAuth : KiiApiAuthService
    ) { 
      super() 
    }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addSubscriber(
        this.route.queryParams.subscribe(params => {
          if (this.hasValidParams(params)) {
            //Check if the account is validated
            this.addSubscriber(
              this.kiiApiAuth.validateEmail(params).subscribe(res => {
                //We are getting token and authUser so we need to save everything
                this.kiiApiAuth.setLoggedInUser(new User(res.user));
                User.saveToken(res.token);
                this.router.navigate([""]);
              }, (error) => {
                this.router.navigate([""]);
              })
            )
          }      
        })
      )
  }
  }

  /**Checks that parameters are valid */
  hasValidParams(params:any) {
    if (!params['id']) return false;
    if (!params['key']) return false;
    return true;
  }
}
