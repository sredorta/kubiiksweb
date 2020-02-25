import { Component, OnInit, Output, EventEmitter, Input,Type, AfterViewChecked, OnDestroy, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, Injector, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { KiiAnchorDialogRefDirective } from '../../directives/kii-anchor-dialog-ref-directive';
import { KiiDialog } from '../../services/kii-dialog.service';
import { KiiDialogConfig } from '../../utils/kii-dialog-config';
import { KiiDialogRef } from '../../utils/kii-dialog-ref';

@Component({
  selector: 'kii-dialog',
  templateUrl: './kii-dialog.component.html',
  styleUrls: ['./kii-dialog.component.scss']
})
export class KiiDialogComponent implements AfterViewInit,OnDestroy {
  private readonly _onClose = new Subject<any>()
  private viewContainerRef : ViewContainerRef;

  public componentRef: ComponentRef<any>
  public childComponentType: Type<any>
  public onClose = this._onClose.asObservable()

  @ViewChild(KiiAnchorDialogRefDirective, {static: true}) anchor: KiiAnchorDialogRefDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private cd: ChangeDetectorRef, private injector: Injector) { }

  /**Load child component */
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }



  onOverlayClicked(evt: MouseEvent) {
    const config = this.injector.get(KiiDialogConfig, new KiiDialogConfig());
    const ref = this.injector.get(KiiDialogRef);
    if (!config) {
        ref.close(false);
    } else if(!config.disableClose) {
      ref.close(false);
    }
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation()
  }

  /**Loads child component */
  private loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.viewContainerRef = this.anchor.viewContainerRef;
    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
  }

  /**Removes the child if we remove the parent */
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
