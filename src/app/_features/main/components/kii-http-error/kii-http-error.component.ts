import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';
import { KiiBottomSheetConfig } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-config';

@Component({
  selector: 'kii-http-error',
  templateUrl: './kii-http-error.component.html',
  styleUrls: ['./kii-http-error.component.scss']
})
export class KiiHttpErrorComponent implements OnInit {

  constructor(private ref: KiiBottomSheetRef, public config: KiiBottomSheetConfig) { }

  ngOnInit() {
    setTimeout(()=> {
      this.ref.close();
    },66000);
  }

  dismiss() {
    this.ref.close();
  }
}
