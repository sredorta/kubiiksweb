import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { User } from 'src/app/_features/main/models/user';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';


@Component({
  selector: 'kii-profile',
  templateUrl: './kii-profile.component.html',
  styleUrls: ['./kii-profile.component.scss']
})
export class KiiProfileComponent extends KiiBaseAbstract implements OnInit {

  currentLang :string = ""; 

  loggedInUser = new User(null);

  constructor(
              private kiiTrans: KiiTranslateService,
              private kiiAuth: KiiAuthService,
              @Inject(PLATFORM_ID) private platformId: any,
              private router: Router,
              private dialog : MatDialog) { super() }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['auth', 'form']);
    this.currentLang = this.kiiTrans.getCurrent();
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {this.loggedInUser = res})
    )
    //this.getLoggedInUserSubscription();
  }

  /**Logout user */
  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      User.removeToken();
    }
    this.kiiAuth.setLoggedInUser(new User(null));
    this.router.navigate([""]);
  }

  /**deletes the auth account */
  onDelete() {
/*    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      disableClose:true,
      panelClass: "default-theme",
      data: {title: "kiilib.confirm.title", text: "kiilib.confirm.text"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        if (result) 
          this.addSubscriber(
            this.kiiApiAuth.deleteAuthUser().subscribe(res => {
              this.onLogout();
            }))
      })
    )*/
  }

  /**When the form is valid and submitted */
  onSubmit(value:any) {
/*    this.profileForm.isFormLoading = true;
      this.addSubscriber(this.kiiApiAuth.updateAuthUser(value).subscribe(res => {
        this.kiiApiAuth.setLoggedInUser(new User(res));
        this.profileForm.disableControls();
        this.profileForm.resetPasswords();
        this.profileForm.isFormLoading = false;
      }, () => {
        this.profileForm.isFormLoading = false;
      })
    );
*/

  }

}
