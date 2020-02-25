import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';

@Component({
  selector: 'kii-http-error',
  templateUrl: './kii-http-error.component.html',
  styleUrls: ['./kii-http-error.component.scss']
})
export class KiiHttpErrorComponent implements OnInit {

  @Input() data : any = {message:""};

  constructor(private ref: KiiBottomSheetRef) { }

  ngOnInit() {
    setTimeout(()=> {
      this.ref.close();
    },66000);
  }

  dismiss() {
    this.ref.close();
  }
}
