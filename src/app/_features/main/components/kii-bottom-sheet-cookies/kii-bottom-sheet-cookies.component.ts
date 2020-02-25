import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private _bottom: MatBottomSheetRef<KiiBottomSheetCookiesComponent>) { 
  }

  ngOnInit() {
  }

  reject() {
    this._bottom.dismiss({result:"reject"});
  }

  accept() {
    this._bottom.dismiss({result:"accept"});
  }
}
