import { Component, OnInit } from '@angular/core';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Router } from '@angular/router';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';

@Component({
  selector: 'app-kii-login',
  templateUrl: './kii-login.component.html',
  styleUrls: ['./kii-login.component.scss']
})
export class KiiLoginComponent extends KiiBaseAbstract implements OnInit {

  isLoading:boolean = false;

  constructor(
    private kiiTrans: KiiTranslateService,
    private router : Router,
    private kiiAuth: KiiAuthService,
    private kiiApiAuth: KiiApiAuthService
    ) {super();}

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth', 'form']);
  }

  onSubmit(value:any) {
    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiAuth.login(value).subscribe(res => {
        User.saveToken(res.token);
        this.kiiAuth.setLoggedInUser(new User(res.user));
        this.router.navigate([""]);  
      }, () => this.isLoading = false)
    );
  }

}
