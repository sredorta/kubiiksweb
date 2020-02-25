import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { KiiMainArticleService } from '../../services/kii-main-article.service';
import { KiiDialogConfig } from 'src/app/_features/dialog/utils/kii-dialog-config';
import { KiiDialogRef } from 'src/app/_features/dialog/utils/kii-dialog-ref';

@Component({
  selector: 'kii-popup-dialog',
  templateUrl: './kii-popup-dialog.component.html',
  styleUrls: ['./kii-popup-dialog.component.scss']
})
export class KiiPopupDialogComponent implements OnInit {


  constructor(public articles: KiiMainArticleService, public dialog: KiiDialogRef) { }

  ngOnInit() {
  }

  close() {
    console.log("Closing dialog !");
    this.dialog.close(true);
  }
}
