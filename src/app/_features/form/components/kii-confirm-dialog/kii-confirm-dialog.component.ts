import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

@Component({
  selector: 'kii-confirm-dialog',
  templateUrl: './kii-confirm-dialog.component.html',
  styleUrls: ['./kii-confirm-dialog.component.scss']
})
export class KiiConfirmDialogComponent implements OnInit {
  icons = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.icons['warn'] = faExclamationTriangle;
  }

  ngOnInit() {
  }

}
