import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kii-bottom-sheet-software-update',
  templateUrl: './kii-bottom-sheet-software-update.component.html',
  styleUrls: ['./kii-bottom-sheet-software-update.component.scss']
})
export class KiiBottomSheetSoftwareUpdateComponent implements OnInit {

  constructor(private _bottom: MatBottomSheetRef<KiiBottomSheetSoftwareUpdateComponent>) { }

  ngOnInit() {
  }

  onClick() {
    this._bottom.dismiss(true);
    
  }

}
