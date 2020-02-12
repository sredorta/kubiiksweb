import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { MatDialog, MatSliderChange } from '@angular/material';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { KiiAdminStatsService } from '../../services/kii-admin-stats.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})
export class KiiAdminStatsComponent extends KiiBaseAbstract implements OnInit {



  constructor(
    private dialog: MatDialog,
    private translate: KiiTranslateService,
    private stats: KiiAdminStatsService,
    private kiiAuth : KiiMainUserService,
    //@Inject(PLATFORM_ID) private platformId: any
    ) { super()}




  ngOnInit() {
    this.translate.setRequiredContext(['main','auth','form','admin']);

    this.translate.getTranslation([
      {key:"admin.stats.axis.visits"},
      {key:"admin.stats.axis.day"},
      {key:"admin.stats.axis.day_hours"},
      {key:"admin.stats.axis.traffic"},
      {key:"admin.stats.axis.page"},
      {key:"admin.stats.axis.social"},
      {key:"admin.stats.axis.app"}, 
      {key:"admin.stats.axis.newsletter"}]).subscribe(res => {
      console.log(res);
    })
    /*
    this.addSubscriber(
      this.translate.getTranslations(["admin.stats.axis.visits","stats.axis.day"]).subscribe(res => {
          console.log("GOT TRANSLATION :",res);
    })
    )*/
/*    this.addSubscriber(
      this.trans.get(["kiilib.stats.axis.visits", "kiilib.stats.axis.day", "kiilib.stats.axis.day_hours", "kiilib.stats.axis.traffic", "kiilib.stats.axis.page","kiilib.stats.axis.social","kiilib.stats.axis.app", "kiilib.stats.axis.newsletter"]).subscribe(res => {
        this.axisNames = res;
      })
    );
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
        this.addSubscriber(
          this.trans.get(["kiilib.stats.axis.visits", "kiilib.stats.axis.day", "kiilib.stats.axis.day_hours", "kiilib.stats.axis.traffic", "kiilib.stats.axis.page","kiilib.stats.axis.social","kiilib.stats.axis.app", "kiilib.stats.axis.newsletter"]).subscribe(res => {
            this.axisNames = res;
          })
        )
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
          title: this.axisNames['kiilib.stats.axis.day_hours']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
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
          title: this.axisNames['kiilib.stats.axis.traffic']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
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
          title: this.axisNames['kiilib.stats.axis.page']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
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
          title: this.axisNames['kiilib.stats.axis.day'],
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
          title: this.axisNames['kiilib.stats.axis.social'],
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
          title: this.axisNames['kiilib.stats.axis.app']
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
          title: this.axisNames['kiilib.stats.axis.newsletter']
        }
      }
    ]);

    this.generateStats();*/
  }

  //When we change the period we recompute the stats
  onDaysSliderChange(event:MatSliderChange) {
  /*  this.days = event.value;
    this.generateStats();*/
  }

  /**Generates the stats */
  private generateStats() {
  /*  this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiStats.analyze(this.days).subscribe(res => {
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
    )*/
  }


  /**When we delete all elements */
  onDelete() {
  /*  let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      panelClass: "admin-theme",
      data: {title: "kiilib.stats.confirm.title", text: "kiilib.stats.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDataLoading = true;

        this.addSubscriber(
          this.kiiApiStats.reset().subscribe(res => {
            this.result = new StatResult(null);
            this.isDataLoading = false;
          }, () => this.isDataLoading = false)
        )
      }
    });*/
  }

}
