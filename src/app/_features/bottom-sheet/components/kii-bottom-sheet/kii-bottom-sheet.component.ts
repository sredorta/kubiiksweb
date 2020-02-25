import { Component, OnInit, Output, EventEmitter, Input,Type, AfterViewChecked, OnDestroy, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { KiiAnchorBottomSheetRefDirective } from '../../directives/kii-anchor-bottom-sheet-ref-directive';

@Component({
  selector: 'kii-bottom-sheet',
  templateUrl: './kii-bottom-sheet.component.html',
  styleUrls: ['./kii-bottom-sheet.component.scss']
})
export class KiiBottomSheetComponent implements AfterViewInit,OnDestroy {
  private readonly _onClose = new Subject<any>()

  public componentRef: ComponentRef<any>
  public childComponentType: Type<any>
  public onClose = this._onClose.asObservable()

  @ViewChild(KiiAnchorBottomSheetRefDirective, {static: true}) anchor: KiiAnchorBottomSheetRefDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private cd: ChangeDetectorRef) { }

  /**Load child component */
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }



  onOverlayClicked(evt: MouseEvent) {
    // close the bottom-sheet
  }

  onBottomSheetClicked(evt: MouseEvent) {
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
