import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription, BehaviorSubject } from 'rxjs';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';

@Pipe({
  name: 'kiiNiceDateFormat'
})
export class KiiNiceDateFormatPipe implements PipeTransform {
  subscr : Subscription;
  constructor(private translate: KiiTranslateService) {

  }

  ngOnDestroy() {
    console.log("DESTROYING PIPE")
    if (this.subscr) this.subscr.unsubscribe();
  }


  transform(obj:any) {  
    let value = obj.date;
    let lang = obj.lang;
    var _value = new Date(value).getTime();
    let obs = new BehaviorSubject<string>("");
    var dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );
    if ( dif < 30 ){
      let result = convertToNiceDate(value).split(",");
      this.subscr = this.translate.getTranslation([{key:result[0], params:{count: result[1]}}]).subscribe(res => {
          obs.next(res[0]);
      })
    } else{
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'dd-MMM-yyyy');
        obs.next(convertToNiceDate(value));
    }
    return obs;
 }

}
function convertToNiceDate(time: string) {
  var date = new Date(time),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);
  if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31) {
    var datePipe = new DatePipe("en-US");
    let value = datePipe.transform(time, 'dd-MMM-yyyy');
    return value;  
  }

  return  daydiff == 0 && (
      diff < 60 && "m.now" ||
      diff < 120 && "m.minutesago.one" ||
      diff < 3600 && "m.minutesago.more," + Math.floor(diff / 60)  ||
      diff < 7200 && "m.hoursago.one" ||
      diff < 86400 && "m.hoursago.more," + Math.floor(diff / 3660)) ||
      daydiff == 1 && "m.yesterday" ||
      daydiff < 7 && "m.daysago.more," + daydiff  ||
      daydiff < 31 && "m.weeksago.more," + Math.ceil(daydiff / 7) ;
}