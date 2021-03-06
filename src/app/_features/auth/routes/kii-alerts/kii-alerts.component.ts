import { Component, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import { User } from 'src/app/_features/main/models/user';
import { KiiTableAbstract } from 'src/app/abstracts/kii-table.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { Alert } from 'src/app/_features/main/models/alert';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import { KiiAuthUserService } from '../../services/kii-auth-user.service';


@Component({
  selector: 'kii-alerts',
  templateUrl: './kii-alerts.component.html',
  styleUrls: ['./kii-alerts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],    
})
export class KiiAlertsComponent extends KiiTableAbstract implements OnInit {
  
  /**Contains used icons */
  icons = [];
  
  /**When articles are loading we show spinner with this variable */
  isDataLoading : boolean = false;

  /**Contains current language */
  currentLang : string;

  loggedInUser: User = new User(null);

  /**Make sure that pagination works in this case */
  @ViewChild(MatSort, {static:false}) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
     }
    
  @ViewChild(MatPaginator,{static:false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }  
  setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  constructor(
    private kiiTrans: KiiTranslateService,
    private kiiAuth: KiiMainUserService,
    private kiiApiAuth: KiiAuthUserService,
    private router: Router
    
    ) { 
    super();
    this.icons['eye'] = faEye;
    this.icons['trash'] = faTrash;
  }

  ngOnInit() {
    this.kiiTrans.setRequiredContext(['main','auth', 'form']);
    this.currentLang = this.kiiTrans.getCurrent();
    this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
   this.addSubscriber(
      this.kiiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        this.displayedColumns = ['id', 'message', 'createdAt','isRead'];
        this.initTable(res.alerts.sort((a,b) => b.id - a.id));
        this.tableSettings();
      })
    )
    //Update nice time format language when we change language
    this.addSubscriber(
      this.kiiTrans.onChange.subscribe(res => {
            this.currentLang = res;
      })
    )
  }
  
  trackById(index:number,item:any) {
    return item.id;
  }

  tableSettings() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter) || data.id.toLowerCase().includes(filter);
    };
    //Define the sorting if special
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case 'id': return item.id;
         case 'message': return item.id;
         case 'createdAt' : return item.id;
         default: return item[property];
      }
    };
  }

  onDeleteAlert(alert:Alert) {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiAuth.deleteAlert(alert).subscribe(res => {
        const index = this.loggedInUser.alerts.findIndex(obj => obj.id == alert.id);
        if (index>=0) {
          this.loggedInUser.alerts.splice(index,1);
          this.deleteRow(alert.id);
        }
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }

  markAsRead(alert:Alert) {
    alert.isRead = !alert.isRead;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiAuth.updateAlert(alert).subscribe(res => {
        let index = this.loggedInUser.alerts.findIndex(obj => obj.id == res.id);
        if (index>=0) {
          this.loggedInUser.alerts[index] = res;
        }
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }

  rowClick(alert:Alert) {
    switch (alert.type) {
        case "chat": 
          this.router.navigate(['/'+this.kiiTrans.get()+'/admin/chats']);
          break;
        default: 
          //Do nothing  
    }
  }

}
