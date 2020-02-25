import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { KiiBottomSheetComponent } from '../kii-bottom-sheet/kii-bottom-sheet.component';

@Component({
  selector: 'kii-bottom-sheet-software-update',
  templateUrl: './kii-bottom-sheet-software-update.component.html',
  styleUrls: ['./kii-bottom-sheet-software-update.component.scss']
})
export class KiiBottomSheetSoftwareUpdateComponent implements OnInit {

  constructor(private ref: KiiBottomSheetComponent) { }

  ngOnInit() {
  }

  onClick() {
    this.ref.dismiss(true);
    
  }

}
