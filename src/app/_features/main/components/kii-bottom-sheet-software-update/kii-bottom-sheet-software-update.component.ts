import { Component, OnInit } from '@angular/core';
import { KiiBottomSheetRef } from 'src/app/_features/bottom-sheet/utils/kii-bottom-sheet-ref';

@Component({
  selector: 'kii-bottom-sheet-software-update',
  templateUrl: './kii-bottom-sheet-software-update.component.html',
  styleUrls: ['./kii-bottom-sheet-software-update.component.scss']
})
export class KiiBottomSheetSoftwareUpdateComponent implements OnInit {

  constructor(private ref: KiiBottomSheetRef) { }

  ngOnInit() {
  }

  onClick() {
    this.ref.close(true);
    
  }

}
