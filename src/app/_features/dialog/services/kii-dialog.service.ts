import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
    Inject,
    Type,
    PLATFORM_ID,
    ViewChild,
    Renderer2,
    RendererFactory2,
  } from '@angular/core'
import { KiiDialogModule } from '../kii-dialog.module';
import { KiiDialogComponent } from '../components/kii-dialog/kii-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { KiiDialogConfig } from '../utils/kii-dialog-config';
import { KiiDialogInjector } from '../utils/kii-dialog-injector';
import { KiiDialogRef } from '../utils/kii-dialog-ref';
  

  @Injectable({
    providedIn: KiiDialogModule,
  })
  export class KiiDialog {
    dialogComponentRef: ComponentRef<KiiDialogComponent>
    private r: Renderer2;
    constructor(
      @Inject(PLATFORM_ID) private platform: any,
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector,
      rendererFactory: RendererFactory2
    ) {
      this.r = rendererFactory.createRenderer(null, null);
    }
  
    private appendDialogComponentToBody(config: KiiDialogConfig){
        // create a map with the config
        const map = new WeakMap();
        map.set(KiiDialogConfig, config);
        const dialogRef = new KiiDialogRef();
        map.set(KiiDialogRef, dialogRef);

        // we want to know when somebody called the close mehtod
        const sub = dialogRef.afterClosed.subscribe(() => {
          // close the dialog
          this.removeDialogComponentFromBody();
          sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(KiiDialogComponent);
        const componentRef = componentFactory.create(new KiiDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
      
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        const child = document.body.appendChild(domElem);
        //Add panelClass classes
        if (config && config.panelClass) {
          if (!Array.isArray(config.panelClass))
            this.r.addClass(child,config.panelClass);
          else
            config.panelClass.forEach((item)=> {
              this.r.addClass(child,item);
            })
        }
      
        this.dialogComponentRef = componentRef;
        this.dialogComponentRef.instance.onClose.subscribe(() => {
          this.removeDialogComponentFromBody();
        });
        return dialogRef;
    }

    private removeDialogComponentFromBody() {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
    }

    /**Opens the dialog */
    public open(componentType: Type<any>,config?:KiiDialogConfig) {
      if (isPlatformBrowser(this.platform)) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
      }
    }

    public close() {
      this.dialogComponentRef.destroy();
    }

  }