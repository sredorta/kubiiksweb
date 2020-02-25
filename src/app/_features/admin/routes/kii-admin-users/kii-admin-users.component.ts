import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSlideToggleChange, MatDialog, MatCheckboxChange } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { KiiTableAbstract } from 'src/app/abstracts/kii-table.abstract';
import { IRole } from 'src/app/_features/main/models/role';
import { User, IUser } from 'src/app/_features/main/models/user';
import { KiiConfirmDialogComponent } from 'src/app/_features/form/components/kii-confirm-dialog/kii-confirm-dialog.component';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiAdminUserService } from '../../services/kii-admin-user.service';
import { KiiAuthUserService } from 'src/app/_features/auth/services/kii-auth-user.service';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faMobile } from '@fortawesome/free-solid-svg-icons/faMobile';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import { faUserAltSlash } from '@fortawesome/free-solid-svg-icons/faUserAltSlash';
import { NoopScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-kii-admin-users',
  templateUrl: './kii-admin-users.component.html',
  styleUrls: ['./kii-admin-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})
export class KiiAdminUsersComponent extends KiiTableAbstract implements OnInit {
  /**Contains used icons */
  icons = [];

  /**Contains all available roles after initialization */
  roles : IRole[] = [];
  
  /**Disables or Enables the sliders to modify foles */
  disableRoleSliders : boolean = true;

  /**Current language in use */
  currentLang : string;

  /**All emails templates */
  //emails : Email[] = [];

  /**Checks if user is on a mobile device */
  isMobile : boolean = this.device.isMobile();
  
  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  constructor(private kiiAdminUser : KiiAdminUserService,
              private kiiTrans : KiiTranslateService,
              private dialog : MatDialog, 
              private device : DeviceDetectorService,
              //private kiiApiEmail: KiiApiEmailService,
              private kiiAuth: KiiMainUserService) { 
                super() 
                this.icons['email'] = faEnvelope;
                this.icons['mobile'] = faMobile;
                this.icons['phone'] = faPhone;
                this.icons['language'] = faGlobeEurope;
                this.icons['user-delete'] = faUserAltSlash;
              }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth','form','admin']);

    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.displayedColumns = ['id','lastName', 'firstName', 'email','createdAt'];
    //Get all users
    this.addSubscriber(this.kiiAdminUser.load().subscribe(res => {
      this.initTable(res);
      //Define the filtering
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.lastName.toLowerCase().includes(filter) || data.firstName.toLowerCase().includes(filter);
      };
      //Define the sorting if special
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
           //case 'firstName': return item.name;
           default: return item[property];
        }
      };
      this.isDataLoading = false;
    }, () => this.isDataLoading = false));

    //Get all available roles
    this.addSubscriber(this.kiiAdminUser.getAllRoles().subscribe(res => {
        this.roles = res;
    }));
    //Subscribe to lang changes so that we can update the created date text
    this.addSubscriber(this.kiiTrans.onChange.subscribe(res => {
        this.currentLang = res;
    }))
  }

  /**Loads all email templates */
  loadEmails() {
/*    if (this.emails.length>0) {
      this.emails = [];
    } else {
      this.isDataLoading = true;
      this.emails = [];
      this.addSubscriber(
        this.kiiApiEmail.load().subscribe(emails => {
          this.emails = emails;    
          this.kiiApiEmail.set(this.emails);    
          this.isDataLoading = false;
        })
      )
    }*/
  }

  /**Checks if specific user has the role */
  hasRole(user: IUser, id:number) {
    const myUser = new User(user);
    return myUser.hasRole(id);
  }


  /**When a role changes it's status */
  onRoleChange(event: MatSlideToggleChange, userId:number,roleId:number) {
    this.isDataLoading = true;
    if (event.checked == true)
      this.addSubscriber(
        this.kiiAdminUser.attachRole(userId,roleId).subscribe(res => {
          this.isDataLoading = false;
        }, error => {
          event.source.toggle(); //Undo in case of error
          this.isDataLoading = false;
        }, () => this.isDataLoading = false)
      )
    else
      this.addSubscriber(
        this.kiiAdminUser.detachRole(userId,roleId).subscribe(res => {
          this.isDataLoading = false;
        }, error => {
          event.source.toggle();  //Undo in case of error
          this.isDataLoading = false;
        }, () => this.isDataLoading = false)
      )      
  }

  /**Opens a confirm dialog and deletes the specified user if confirmed */
  onDelete(user:IUser) {
    
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      scrollStrategy:new NoopScrollStrategy(),
      disableClose:true,
      panelClass: "admin-theme",
      data: { text: "admin.users.delete.text"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        console.log("Recieved :",result)
        if (result) {
          this.isDataLoading = true;
          this.addSubscriber(
            this.kiiAdminUser.delete(new User(user)).subscribe(res => {
              this.deleteRow(user.id);
              this.isDataLoading = false;

            }, () => this.isDataLoading = false))
        }
      })
    )
  }

  /** */
  enableAccount(change : MatCheckboxChange, user:IUser) {
    user.isEmailValidated = change.checked;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminUser.update(user).subscribe(res => {
        this.isDataLoading = false;
      }, error => {
        change.source.toggle();  //Undo in case of error
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )

  }
}
