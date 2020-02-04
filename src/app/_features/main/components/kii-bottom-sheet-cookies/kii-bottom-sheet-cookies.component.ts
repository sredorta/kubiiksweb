import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private ref: MatBottomSheetRef<KiiBottomSheetCookiesComponent>) { 
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
