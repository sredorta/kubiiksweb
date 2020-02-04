//Transfer scroll position from server to browser
//This is a local service only available within common module

import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { Router, Scroll, RouterEvent } from '@angular/router';
import { ViewportScroller, isPlatformServer} from '@angular/common';
import { filter } from 'rxjs/operators';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class KiiViewTransferService {
  //router : Router;
  //viewportScroller : ViewportScroller;
  /**When is the first time that we transfer from server to browser */
  isTransfer: boolean = false;
  constructor(
            private router: Router, 
            private viewportScroller: ViewportScroller,
            private transferState: TransferState,
            @Inject(PLATFORM_ID) private _platformId: any
  ) { 
    //this.router = router;
    //this.viewportScroller = viewportScroller;
  }

  /**Handles the scroll when we transfer server/browser*/
  scroll() {
    const key: StateKey<boolean> = makeStateKey<boolean>('transfer-view');
    if (isPlatformServer(this._platformId)) {
      this.transferState.set(key, true);
    } else {
      this.isTransfer = this.transferState.get(key, false);
    }
    console.log("isFirstBrowser returns", this.isTransfer);
    this.router.events.subscribe(e => {
      if (e instanceof Scroll) {
        if (e.position) {
          // backward navigation
          this.viewportScroller.scrollToPosition(e.position);
          console.log("RESTORED SCROLL POSITION !!!!");
        } else if (this.isTransfer) {
          // Do not touch scroll if we come from server
          this.isTransfer = false;
        } else {
          // forward navigation
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    })
  }

}
