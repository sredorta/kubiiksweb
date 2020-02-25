import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'kii-http-error',
  templateUrl: './kii-http-error.component.html',
  styleUrls: ['./kii-http-error.component.scss']
})
export class KiiHttpErrorComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private bottom: MatBottomSheetRef<KiiHttpErrorComponent>) { 
  }

  ngOnInit() {
    setTimeout(()=> {
      this.bottom.dismiss();
    },5000);
  }

  dismiss() {
    this.bottom.dismiss();
  }
}
