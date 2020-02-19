import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { KiiMainArticleService } from '../../services/kii-main-article.service';

@Component({
  selector: 'kii-popup-dialog',
  templateUrl: './kii-popup-dialog.component.html',
  styleUrls: ['./kii-popup-dialog.component.scss']
})
export class KiiPopupDialogComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Input() show :boolean = false;

  constructor(public articles: KiiMainArticleService) { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit(true);

  }
}
