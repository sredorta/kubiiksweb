import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { MatDialog, MatSliderChange } from '@angular/material';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { KiiAdminStatsService } from '../../services/kii-admin-stats.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import * as deepmerge from 'deepmerge';
import { KiiConfirmDialogComponent } from 'src/app/_features/form/components/kii-confirm-dialog/kii-confirm-dialog.component';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NoopScrollStrategy } from '@angular/cdk/overlay';


interface IStatWindow {
  current : number;
  previous:number;
}

class StatResult {
  visits_count : IStatWindow = {current:0,previous:0};
  visits_duration : IStatWindow = {current:0,previous:0};
  pages_count : IStatWindow = {current:0,previous:0};
  pages_per_visit : IStatWindow = {current:0,previous:0};
  social_click_count : IStatWindow = {current:0,previous:0};
  chat_click_count : IStatWindow = {current:0,previous:0};
  chat_duration : IStatWindow = {current:0,previous:0};
  chat_message_count : IStatWindow = {current:0,previous:0};
  app_install_count : IStatWindow = {current:0,previous:0};


  visits_hours_histogram : any[] = [[],[],[],[],[],[],[],[]];
  visits_over_day : any[] = [];
  app_over_day : any [] = [];
  newsletter_over_day : any = [];
  referrals_histogram : any[] = [];
  social_over_day : any = {all:[]};
  social_histogram : any[] = [];
  pages_visited_histogram : any = {};
  languages : any[] = [];

  constructor(obj: any | null) {
      if (obj) {
          Object.keys(this).forEach(key => {
              if (obj[key] != undefined) 
                  this[key] = obj[key];
          });
      } 
  }

}

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})
export class KiiAdminStatsComponent extends KiiBaseAbstract implements OnInit {

  /**Contains icons */
  icons = [];

  /**Days of the analysis */
  days : number = 7;

  /**When we are loading new analyisis */
  isDataLoading : boolean = false;

  result : StatResult = new StatResult(null);

  /**Default options for google charts */
  defaultChartOptions : any = {
    backgroundColor:'#212121',
    colors:['#9ccc65','#ffee58','#ffa726','#8d6e63','#78909C'], 
    vAxis:{
      textStyle:{
        color:'white',
        fontSize:10
      },
      baselineColor:'white',
      titleTextStyle: {
        color:'white',
      }
    }, 
    hAxis:{
      textStyle:{
        color:'white',
        fontSize:10
      },
      baselineColor:'white',
      titleTextStyle: {
        color:'white',
      }
    },   
    legend: {position:'none'},
    chartArea: {left:50,right:20,top:10,bottom:70,width: '100%', 'height': '100%'},
    titleTextStyle: {
      color:'white',
      fontSize:18,
      bold:true
    },
  }

  pagesVisitedHistogram : any[] = [];


  visitsOverTimeOptions : any = {};
  socialOverTimeOptions : any = {};
  histoHoursVisitsOptions : any = {};
  referralsOptions : any = {};
  histoPagesOptions : any = {};
  languagesOptions : any = {};
  socialHistoOptions : any = {};
  appOverTimeOptions : any = {};
  newsletterOverTimeOptions : any = {};
  dayOfWeek : number = 7;
  language : string = this.translate.getCurrent();
  languagesAvailable : any = this.translate.getSupportedLanguages();
  socialTypes : any[] = [];
  social : string = "all";
  axisNames : any = {};

  /**When translations are loaded */
  loadedTrans : boolean = false;

  constructor(
    private dialog: MatDialog,
    private translate: KiiTranslateService,
    private stats: KiiAdminStatsService,
    private kiiAuth : KiiMainUserService,
    //@Inject(PLATFORM_ID) private platformId: any
    ) { 
      super();
      this.icons['calendar'] = faCalendarDay;
      this.icons['delete'] = faTrash;
    }




  ngOnInit() {
    this.translate.setRequiredContext(['main','auth','form','admin']);

    this.addSubscriber(
      this.translate.getTranslation([
        {key:"admin.stats.axis.visits"},
        {key:"admin.stats.axis.day"},
        {key:"admin.stats.axis.day_hours"},
        {key:"admin.stats.axis.traffic"},
        {key:"admin.stats.axis.page"},
        {key:"admin.stats.axis.social"},
        {key:"admin.stats.axis.app"}, 
        {key:"admin.stats.axis.newsletter"}]).subscribe(res => {
        //Tell that we have recieved translations so that we don't get issues
        if (res['admin.stats.axis.visits']!="") this.loadedTrans = true;
        this.axisNames = res;
      })
    )

    this.histoHoursVisitsOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: this.axisNames['admin.stats.axis.day_hours']
        },
        vAxis: {
          title: this.axisNames['admin.stats.axis.visits']
        }
      }
    ]);
    this.referralsOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: this.axisNames['admin.stats.axis.traffic']
        },
        vAxis: {
          title: this.axisNames['admin.stats.axis.visits']
        },
        chartArea: {left:50,right:20,top:10,bottom:200,width: '100%', 'height': '100%'},
      }
    ]);
    this.histoPagesOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: this.axisNames['admin.stats.axis.page']
        },
        vAxis: {
          title: this.axisNames['admin.stats.axis.visits']
        },
        chartArea: {left:50,right:20,top:10,bottom:200,width: '100%', 'height': '100%'},
      }
    ]);
    this.visitsOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        curveType: 'function',
        hAxis: {
          title:"Day",
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
        }
      }
    ]);
    this.socialOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        curveType: 'function',
        hAxis: {
          title: this.axisNames['admin.stats.axis.day'],
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title:"Clicks"
        }
      }
    ]);

    this.languagesOptions = deepmerge.all([this.defaultChartOptions,
      {
        pieHole:0.4,
        pieSliceTextStyle: {
          color: 'white',
        },
      }
    ]);    
    this.socialHistoOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          title: this.axisNames['admin.stats.axis.social'],
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title:"Clicks"

        }
      }
    ]);
    this.appOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        curveType: 'function',
        hAxis: {
          title:"Day",
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title: this.axisNames['admin.stats.axis.app']
        }
      }
    ]);

    this.newsletterOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        curveType: 'function',
        hAxis: {
          title:"Day",
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title: this.axisNames['admin.stats.axis.newsletter']
        }
      }
    ]);

    this.generateStats();
  }

  //When we change the period we recompute the stats
  onDaysSliderChange(event:MatSliderChange) {
    this.days = event.value;
    this.generateStats();
  }

  /**Generates the stats */
  private generateStats() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.stats.analyze(this.days).subscribe(res => {
        console.log("STATS", res);
        //Convert dates into Date objects
        for (let elem of res.visits_over_day) {
          elem[0] = new Date(elem[0]);
        }
        for (let elem of res.app_over_day) {
          elem[0] = new Date(elem[0]);
        }
        for (let elem of res.newsletter_over_day) {
          elem[0] = new Date(elem[0]);
        }
        Object.keys(res.social_over_day).forEach((social) => {
          //Convert dates into Date objects
          for (let elem of res.social_over_day[social]) {
              elem[0] = new Date(elem[0]);
          }
        });
        this.result = res;
        this.pagesVisitedHistogram = this.result.pages_visited_histogram[this.language];
        this.socialTypes = Object.keys(this.result.social_over_day);
        this.isDataLoading = false;
      },
      () => this.isDataLoading = false)
    )
  }


  /**When we delete all elements */
  onDelete() {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: "admin-theme",
      data: {text: "admin.stats.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDataLoading = true;

        this.addSubscriber(
          this.stats.reset().subscribe(res => {
            this.result = new StatResult(null);
            this.isDataLoading = false;
          }, () => this.isDataLoading = false)
        )
      }
    });
  }

}
