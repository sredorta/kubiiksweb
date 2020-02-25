import { Component, OnInit, Output, EventEmitter, Input,Type, AfterViewChecked, OnDestroy, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, Injector, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { KiiAnchorBottomSheetRefDirective } from '../../directives/kii-anchor-bottom-sheet-ref-directive';
import { KiiBottomSheetConfig } from '../../utils/kii-bottom-sheet-config';
import { KiiBottomSheetRef } from '../../utils/kii-bottom-sheet-ref';

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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private injector: Injector,
    ) { }

  /**Load child component */
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }



  onOverlayClicked(evt: MouseEvent) {
    const config = this.injector.get(KiiBottomSheetConfig, new KiiBottomSheetConfig());
    const ref = this.injector.get(KiiBottomSheetRef);
    if (!config) {
        ref.close(false);
    } else if(!config.disableClose) {
      ref.close(false);
    }
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
