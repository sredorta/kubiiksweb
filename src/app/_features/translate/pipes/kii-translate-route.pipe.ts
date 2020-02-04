import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KiiTranslateService } from '../services/kii-translate.service';

@Pipe({
  name: 'translateRoute',
})
export class KiiTranslateRoutePipe implements PipeTransform {
  previousValue : string;
  subscription = [];
  constructor(private trans :KiiTranslateService) {}
  transform(value: any, ...args: any[]): any {
      const _subject = new BehaviorSubject(this.getTranslatedRoute(value,this.trans.getCurrent()));
      this.subscription.push(this.trans.onChange.subscribe(res => {
        console.log("LANGUAGE CHNAGED TO:", res );
          _subject.next(this.getTranslatedRoute(value,res));
      }));
      return _subject;
  }

  getTranslatedRoute(value:string,lang:string) {
    return '/'+lang+'/'+value;
  }

  ngOnDestroy() {
    for (let subscription of this.subscription) {
      subscription.unsubscribe();
    }
  }
}

