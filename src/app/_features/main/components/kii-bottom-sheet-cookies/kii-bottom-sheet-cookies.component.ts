import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { KiiBottomSheetComponent } from '../kii-bottom-sheet/kii-bottom-sheet.component';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private ref: KiiBottomSheetComponent) { 
  }

  ngOnInit() {
  }

  reject() {
    this.ref.dismiss({result:"reject"});
  }

  accept() {
    this.ref.dismiss({result:"accept"});
  }
}
