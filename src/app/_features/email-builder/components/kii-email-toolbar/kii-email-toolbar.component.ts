import { Component, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { KiiEmailBuilderService, EmailBlock, EBlockTypes, EContextTypes } from '../../services/kii-email-builder.service';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';



@Component({
  selector: 'kii-email-toolbar',
  templateUrl: './kii-email-toolbar.component.html',
  styleUrls: ['./kii-email-toolbar.component.scss']
})
export class KiiEmailToolbarComponent  implements OnInit {

  icons :any = {
    block:faThLarge,
    color: faPalette
  };

  blockTypes : EBlockTypes[] = EmailBlock.getAllBlockTypes();

  context = EContextTypes.BODY;

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private service : KiiEmailBuilderService
    ) { 
      console.log(this.blockTypes);

    }

  ngOnInit() { 
  }


  /**Create a new block if required */
  onCreateBlock(type: EBlockTypes) {
    console.log("Creating block", type);
    this.service.createBlock(type);
  }


}
