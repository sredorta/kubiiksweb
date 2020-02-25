import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { KiiBottomSheetComponent } from '../kii-bottom-sheet/kii-bottom-sheet.component';

@Component({
  selector: 'kii-http-error',
  templateUrl: './kii-http-error.component.html',
  styleUrls: ['./kii-http-error.component.scss']
})
export class KiiHttpErrorComponent implements OnInit {

  @Input() data : any = {message:""};

  constructor(private ref: KiiBottomSheetComponent) { }

  ngOnInit() {
    setTimeout(()=> {
      this.ref.dismiss();
    },66000);
  }

  dismiss() {
    this.ref.dismiss();
  }
}
