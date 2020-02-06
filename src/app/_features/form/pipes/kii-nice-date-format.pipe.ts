import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';

@Pipe({
  name: 'kiiNiceDateFormat'
})
export class KiiNiceDateFormatPipe implements PipeTransform {
  result : string = "";
  constructor(private translate: KiiTranslateService) {

  }



  transform(obj:any) {  
    let value = obj.date;
    let lang = obj.lang;
    var _value = new Date(value).getTime();
    var dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );
    if ( dif < 30 ){
      let result = convertToNiceDate(value).split(",");
      console.log(result);
      /*let subscription = this.translate.get(result[0],{count : result[1]}).subscribe((trans) => {
        this.result = trans;
      });
      subscription.unsubscribe();*/
    } else{
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'dd-MMM-yyyy');
        this.result = convertToNiceDate(value);
    }
    return this.result;
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
      diff < 60 && "kiilib.dateformat.now" ||
      diff < 120 && "kiilib.dateformat.minutesago.one" ||
      diff < 3600 && "kiilib.dateformat.minutesago.more," + Math.floor(diff / 60)  ||
      diff < 7200 && "kiilib.dateformat.hoursago.one" ||
      diff < 86400 && "kiilib.dateformat.hoursago.more," + Math.floor(diff / 3660)) ||
      daydiff == 1 && "kiilib.dateformat.yesterday" ||
      daydiff < 7 && "kiilib.dateformat.daysago.more," + daydiff  ||
      daydiff < 31 && "kiilib.dateformat.weeksago.more," + Math.ceil(daydiff / 7) ;

}