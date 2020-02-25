import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';
import { KiiBottomSheet } from 'src/app/_features/bottom-sheet/services/kii-bottom-sheet.service';

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
