import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';

@Component({
  selector: 'kii-reset-password',
  templateUrl: './kii-reset-password.component.html',
  styleUrls: ['./kii-reset-password.component.scss']
})
export class KiiResetPasswordComponent extends KiiBaseAbstract implements OnInit {
  loading:boolean = false;
  constructor(private kiiTrans: KiiTranslateService, private kiiApiAuth: KiiApiAuthService) {super() }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);
  }
  onSubmit(value:any) {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiAuth.resetpassword(value).subscribe(res => {
        this.loading = false;
      }, () => this.loading = false)
    );
  }
}
