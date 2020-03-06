import { Component, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { KiiEmailBuilderService, EmailBlock, EBlockTypes } from '../../services/kii-email-builder.service';



@Component({
  selector: 'kii-email-toolbar',
  templateUrl: './kii-email-toolbar.component.html',
  styleUrls: ['./kii-email-toolbar.component.scss']
})
export class KiiEmailToolbarComponent  implements OnInit {

  icons :any = {
    block:faThLarge
  };

  blockTypes : EBlockTypes[] = EmailBlock.getAllBlockTypes();


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private service : KiiEmailBuilderService
    ) { 
      console.log(this.blockTypes);

    }

  ngOnInit() { 
  }


  onCreateBlock(type: EBlockTypes) {
    console.log("Creating block", type);
    let myBlock = new EmailBlock();
    myBlock.type = type;

    this.service.createBlock(myBlock);
  }


  onSubmit(value:any) {
    console.log("Submitting value:",value);
    console.log(this.createStructure("Header",value.content,"Footer"))
  }

  /**Retruns email complete structure */
  createStructure(header:string,content:string,footer:string) {
    return `
    <table border="1" cellpadding="0" cellspacing="0" width="100%">
     <tr>
      <td>
        <table align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse;max-width:600px;width:100%">
          <tr>
            <td>
            ${header}
            </td>
          </tr>
          <tr>
            <td>
            ${content}
            </td>
          </tr>
          <tr>
            <td>
            ${footer}
            </td>
          </tr>          
        </table>
      </td>
     </tr>
    </table>
    `;
  }
  /**Adds final structure with body... */
  wrapStructure() {
    //TODO
  }


  onContentChange(content:string) {
    console.log("Content:",content);
    this.onChange.emit(this.createStructure("Header",content,"Footer"))
  }

}
