import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private ref: KiiBottomSheetRef) { 
  }

  ngOnInit() {
  }

  reject() {
    this.ref.close({result:"reject"});
  }

  accept() {
    this.ref.close({result:"accept"});
  }
}
