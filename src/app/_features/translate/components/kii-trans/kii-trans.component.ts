import { Component, OnInit } from '@angular/core';
import { KiiTranslateService } from '../../services/kii-translate.service';

@Component({
  selector: 'kii-trans',
  templateUrl: './kii-trans.component.html',
  styleUrls: ['./kii-trans.component.scss']
})
export class KiiTransComponent implements OnInit {

  constructor(private trans: KiiTranslateService) { 
    console.log("KII_TRANS CONSTRUCTOR !")
    this.trans.setRequiredContext(['main']);
  }

  ngOnInit() {
  }

}
