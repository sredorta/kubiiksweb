import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiAuthUserService } from '../../services/kii-auth-user.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';

@Component({
  selector: 'app-kii-email-validate',
  templateUrl: './kii-email-validate.component.html',
  styleUrls: ['./kii-email-validate.component.scss']
})
export class KiiEmailValidateComponent extends KiiBaseAbstract implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private kiiAuth : KiiMainUserService,
    private kiiApiAuth: KiiAuthUserService
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
                this.kiiAuth.setLoggedInUser(new User(res.user));
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
