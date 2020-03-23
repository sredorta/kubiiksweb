import { Component, OnInit } from '@angular/core';
import * as deepmerge from 'deepmerge';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { DiskResult, KiiAdminDiskService } from '../../services/kii-admin-disk.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { KiiTranslateModule } from 'src/app/_features/translate/kii-translate.module';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';



@Component({
  selector: 'kii-admin-disk',
  templateUrl: './kii-admin-disk.component.html',
  styleUrls: ['./kii-admin-disk.component.scss']
})


export class KiiAdminDiskComponent extends KiiBaseAbstract implements OnInit {

  icons = {
    delete:faTrash
  }

  isDataLoading : boolean = true;
  result : DiskResult = new DiskResult(null);


  /**Default options for google charts */
  chartOptions : any = {
    backgroundColor:'#212121',
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
    chartArea: {left:0,right:0,top:10,bottom:20,width: '100%', 'height': '100%'},
    titleTextStyle: {
      color:'white',
      fontSize:18,
      bold:true
    },
    colors:['#558B2F','#7CB342','#9CCC65','#C5E1A5','#F1F8E9'], 
    pieSliceTextStyle: {
      color: 'white',
    },
  }




  constructor(private kiiApiDisk: KiiAdminDiskService, private translate: KiiTranslateService) {super() }

  ngOnInit() {
    this.translate.setRequiredContext(['main','auth','form','admin']);

    this.addSubscriber(
      this.kiiApiDisk.scan().subscribe(res => {
        this.result = res;
        this.isDataLoading = false;
      },()=> this.isDataLoading = false)
    )
  }

  /**When we ask for optimize disk */
  onDelete() {
    this.isDataLoading = true;
    this.kiiApiDisk.optimize().subscribe(res => {
      this.result = res;
      this.isDataLoading = false;
    },()=> this.isDataLoading = false)
  }

}
