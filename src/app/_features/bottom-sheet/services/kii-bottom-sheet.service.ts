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
import { KiiBottomSheetModule } from '../kii-bottom-sheet.module';
import { KiiBottomSheetComponent } from '../components/kii-bottom-sheet/kii-bottom-sheet.component';
import { isPlatformBrowser } from '@angular/common';
import { KiiBottomSheetConfig } from '../utils/kii-bottom-sheet-config';
import { KiiBottomSheetInjector } from '../utils/kii-bottom-sheet-injector';
import { KiiBottomSheetRef } from '../utils/kii-bottom-sheet-ref';
  

  @Injectable({
    providedIn: KiiBottomSheetModule,
  })
  export class KiiBottomSheet {
    bottomSheetComponentRef: ComponentRef<KiiBottomSheetComponent>
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
  
    private appendBottomSheetComponentToBody(config: KiiBottomSheetConfig){
        // create a map with the config
        const map = new WeakMap();
        map.set(KiiBottomSheetConfig, config);
        const bottomSheetRef = new KiiBottomSheetRef();
        map.set(KiiBottomSheetRef, bottomSheetRef);

        // we want to know when somebody called the close mehtod
        const sub = bottomSheetRef.afterClosed.subscribe(() => {
          // close the bottom-sheet
          this.removeBottomSheetComponentFromBody();
          sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(KiiBottomSheetComponent);
        const componentRef = componentFactory.create(new KiiBottomSheetInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
      
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        console.log("DOM ELEM",document.querySelector('app-root'));
        //const child = document.querySelector('kii-app').appendChild(domElem);
        const child = document.body.appendChild(domElem);

        //Add panelClass classes
        if(config && config.panelClass) {
          if (!Array.isArray(config.panelClass))
            this.r.addClass(child,config.panelClass);
          else
            config.panelClass.forEach((item)=> {
              this.r.addClass(child,item);

            })
        }
      
        this.bottomSheetComponentRef = componentRef;
        this.bottomSheetComponentRef.instance.onClose.subscribe(() => {
          this.removeBottomSheetComponentFromBody();
        });
        return bottomSheetRef;
    }

    private removeBottomSheetComponentFromBody() {
      this.appRef.detachView(this.bottomSheetComponentRef.hostView);
      this.bottomSheetComponentRef.destroy();
    }

    /**Opens the bottom-sheet */
    public open(componentType: Type<any>,config?:KiiBottomSheetConfig) {
      if (isPlatformBrowser(this.platform)) {
        const bottomSheetRef = this.appendBottomSheetComponentToBody(config);
        this.bottomSheetComponentRef.instance.childComponentType = componentType;
        return bottomSheetRef;
      }
    }

    public close() {
      this.bottomSheetComponentRef.destroy();
    }

  }