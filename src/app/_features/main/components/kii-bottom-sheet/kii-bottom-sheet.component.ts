import { Component, OnInit, Output, EventEmitter, Input, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { KiiMainArticleService } from '../../services/kii-main-article.service';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { Subject } from 'rxjs';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-bottom-sheet',
  templateUrl: './kii-bottom-sheet.component.html',
  styleUrls: ['./kii-bottom-sheet.component.scss']
})
export class KiiBottomSheetComponent extends KiiBaseAbstract implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Input() show :boolean = false;
  //@ViewChild(KiiAnchorRefDirective, {static: true}) anchor: KiiAnchorRefDirective;

  data:any={};

  private _afterDismissed : Subject<any> = new Subject<any>();

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    //private kiiEntry: KiiEntryComponentService
    ) { super() }

  ngOnInit() {
    /*this.addSubscriber(
      this.kiiEntry.getShowBottom().subscribe(res => {
        this.show = res;
      })
    )*/
  }


  open(component:any, data?:any) {
    console.log("open !");
    if (data) {
      this.data = data;
      console.log("Set data to",data);
    }
    if (!this.show) {
      console.log("Filling bottom sheet",component)
      /*  this.anchor.viewContainerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let componentRef =  this.anchor.viewContainerRef.createComponent(componentFactory);
        this.kiiEntry.setShowBottom(true);*/
    }

    return this;
  }

  dismiss(value?:any) {
    if (value)
      this._afterDismissed.next(value);
    //this.kiiEntry.setShowBottom(false);
  }

  /**Returns the result after dismissed */
  afterDismissed() {
    return this._afterDismissed;
  }
}
