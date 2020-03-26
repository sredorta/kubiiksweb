import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiAuthUserService } from '../../services/kii-auth-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_features/main/models/user';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';

@Component({
  selector: 'kii-establish-password',
  templateUrl: './kii-establish-password.component.html',
  styleUrls: ['./kii-establish-password.component.scss']
})
export class KiiEstablishPasswordComponent extends KiiBaseAbstract implements OnInit {
  isLoading:boolean = false;
  id : number = 0;
  key: string = "";
  constructor(
    private kiiTrans: KiiTranslateService, 
    private kiiApiAuth: KiiAuthUserService,
    private route : ActivatedRoute,
    private router: Router,
    private kiiAuth: KiiMainUserService
    ) {super() }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth', 'form']);
    this.addSubscriber(
      this.route.queryParams.subscribe(params => {
        if (params['id']) this.id = params['id'];
        if (params['key']) this.key = params['key'];
      }));
  }
  onSubmit(value:any) {
    value['id'] = this.id;
    value['key'] = this.key;
    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiAuth.establishpassword(value).subscribe(res => {
        User.saveToken(res.token);
        this.kiiAuth.setLoggedInUser(new User(res.user));
        this.router.navigate([""]);  
        this.isLoading = false;
      }, () => this.isLoading = false)
    );
  }
}
