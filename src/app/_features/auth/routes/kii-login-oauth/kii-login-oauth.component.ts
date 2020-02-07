import { Component, OnInit,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';

@Component({
  selector: 'kii-login-oauth',
  templateUrl: './kii-login-oauth.component.html',
  styleUrls: ['./kii-login-oauth.component.scss']
})
export class KiiLoginOauthComponent extends KiiBaseAbstract implements OnInit {
  /**Token recieved as query param */
  public token:string = "";

  /**Current user */
  user : User = new User(null); //Current user
  /**When we load the data */
  loading:boolean = true;

  /**Show terms and conditions or not */
  showTerms:boolean = false;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private kiiApiAuth : KiiApiAuthService,
    private kiiAuth: KiiAuthService,
    private kiiTrans : KiiTranslateService) {super() }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);

    //If we navigate away and terms are not accepted we reset user
    this.addSubscriber(
      this.router.events.subscribe((event)=> {
        if (event instanceof NavigationStart) {
          if (!this.user.terms && this.user.exists()) {
            this.kiiAuth.setLoggedInUser(new User(null));
            User.removeToken();
          }
          if (this.user.terms == true && this.user.exists()) {
            this.kiiAuth.setLoggedInUser(this.user);
          }
        }
      })
    )
  }

  ngAfterViewInit() {

      this.addSubscriber(this.route.params.subscribe(params => {
        this.token = params['token'];
        if (isPlatformBrowser(this.platformId)) {
          User.saveToken(this.token);
        }
        console.log("WE SAVED THE TOKEN", this.token);
        //We got a temporary token... but we still need to check if all parameters are valid in the user
        this.addSubscriber(this.kiiApiAuth.oauth2Validate().subscribe(res => {
            console.log("RESULT",res);
            this.loading = false;
            if (res.complete != true) {
              this.user = new User(res.user);
              this.showTerms = true;
            } else {
              console.log("HERE", new User(res.user));
              this.kiiAuth.setLoggedInUser(new User(res.user));
              this.router.navigate([""]);
            }
          },(error) => {console.log("Auth2 validate error",error);}
          , () => {this.loading = false}
        ));
      }));
  }

  onSubmit(value:any) {
    if (!value) //We have rejected terms
      this.router.navigate([""]);
    else { //We have accepted terms
      this.loading = true;
      //Now we neet to update the user with the given extra data and move to home
      this.user.update({terms:true, language: this.kiiTrans.getCurrent(), isEmailValidated:true});
      this.addSubscriber(this.kiiApiAuth.oauth2Update(this.user.to("IUser"),value['newsletter']).subscribe(res => {
        console.log("SETTING LOGGED INUSER TO", new User(res));
        this.kiiAuth.setLoggedInUser(new User(res));
        this.router.navigate([""]);
        this.loading = false;
      },() => this.loading = false));
    }
  }
}
