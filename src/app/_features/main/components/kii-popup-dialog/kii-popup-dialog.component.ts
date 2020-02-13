import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'kii-popup-dialog',
  templateUrl: './kii-popup-dialog.component.html',
  styleUrls: ['./kii-popup-dialog.component.scss']
})
export class KiiPopupDialogComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Input() show :boolean = false;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit(true);

  }
}
