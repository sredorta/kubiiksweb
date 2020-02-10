import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiApiAuthService } from '../../services/kii-api-auth.service';
import { KiiProfileFormComponent } from '../../components/kii-profile-form/kii-profile-form.component';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons/faUserSlash';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faUserClock } from '@fortawesome/free-solid-svg-icons/faUserClock';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faUserLock } from '@fortawesome/free-solid-svg-icons/faUserLock';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons/faIdCardAlt';
import { KiiConfirmDialogComponent } from 'src/app/_features/form/components/kii-confirm-dialog/kii-confirm-dialog.component';

@Component({
  selector: 'kii-profile',
  templateUrl: './kii-profile.component.html',
  styleUrls: ['./kii-profile.component.scss']
})
export class KiiProfileComponent extends KiiBaseAbstract implements OnInit {

  isLoading : boolean = false;

  currentLang :string = ""; 

  loggedInUser = new User(null);

  icon = [];

  @ViewChild(KiiProfileFormComponent, {static:false}) profileForm : KiiProfileFormComponent;
  constructor(
              private kiiTrans: KiiTranslateService,
              private kiiAuth: KiiAuthService,
              private kiiApiAuth : KiiApiAuthService,
              @Inject(PLATFORM_ID) private platformId: any,
              private router: Router,
              private dialog : MatDialog) { 
                super();
                this.icon['logout'] = faSignOutAlt;
                this.icon['delete'] = faUserSlash;
                this.icon['created'] = faUserClock;
                this.icon['updated'] = faHistory;
                this.icon['roles'] = faUserLock;
                this.icon['card'] = faIdCardAlt;
              }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);
    this.currentLang = this.kiiTrans.getCurrent();
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {this.loggedInUser = res})
    )
    //this.getLoggedInUserSubscription();
  }

  /**Logout user */
  logout() {
    this.kiiAuth.logout();
    this.router.navigate(['']);
  }

  /**deletes the auth account */
  delete() {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      disableClose:true,
      panelClass: "default-theme",
      data: {text: "a.delete.confirm"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        if (result) 
          this.addSubscriber(
            this.kiiApiAuth.deleteAuthUser().subscribe(res => {
              this.logout();
            }))
      })
    )
  }

  /**When the form is valid and submitted */
  onSubmit(value:any) {
    this.isLoading = true;
      this.addSubscriber(this.kiiApiAuth.updateAuthUser(value).subscribe(res => {
        this.kiiAuth.setLoggedInUser(new User(res));
        this.profileForm.reset();
        /*this.profileForm.disableControls();
        this.profileForm.resetPasswords();*/
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      })
    );
  }

}
