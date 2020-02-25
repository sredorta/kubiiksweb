import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { KiiMainArticleService } from '../../services/kii-main-article.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'kii-popup-dialog',
  templateUrl: './kii-popup-dialog.component.html',
  styleUrls: ['./kii-popup-dialog.component.scss']
})
export class KiiPopupDialogComponent implements OnInit {


  constructor(public articles: KiiMainArticleService, public dialogRef: MatDialogRef<KiiPopupDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    console.log("Closing dialog !");
    this.dialogRef.close(true);
  }
}
