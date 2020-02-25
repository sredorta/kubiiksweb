import { Component, OnInit, Output, EventEmitter, Input,Type, AfterViewChecked, OnDestroy, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { KiiAnchorRefDirective } from '../../directives/kii-anchor-ref-directive';

@Component({
  selector: 'kii-dialog',
  templateUrl: './kii-dialog.component.html',
  styleUrls: ['./kii-dialog.component.scss']
})
export class KiiDialogComponent implements AfterViewInit,OnDestroy {
  private readonly _onClose = new Subject<any>()

  public componentRef: ComponentRef<any>
  public childComponentType: Type<any>
  public onClose = this._onClose.asObservable()

  @ViewChild(KiiAnchorRefDirective, {static: true}) anchor: KiiAnchorRefDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private cd: ChangeDetectorRef) { }

  /**Load child component */
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }



  onOverlayClicked(evt: MouseEvent) {
    // close the dialog
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation()
  }

  /**Loads child component */
  private loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.anchor.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  /**Removes the child if we remove the parent */
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
