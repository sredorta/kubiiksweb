import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, SimpleChanges, ElementRef, ɵSafeHtml } from '@angular/core';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract.js';
import { KiiEmailTemplateService, IEmailData, IEmailBlock, IEmailCell } from '../../services/kii-email-template.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';



@Component({
  selector: 'kii-email-editor',
  templateUrl: './kii-email-editor.component.html',
  styleUrls: ['./kii-email-editor.component.scss']
})
export class KiiEmailEditorComponent extends KiiFormAbstract implements OnInit {
  icons = {
    save: faSave,
    title: faHeading
  };

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

  /**Event generated when we require to save changes */
  @Output() onSave :EventEmitter<IEmailData> = new EventEmitter<IEmailData>();


  /**Request for a new image so that the dialog can be open */
  @Output() onRequestImage = new EventEmitter<boolean>();

  /**Result of the image uploaded */
  @Input() resultImage: string = null; 

  /**Input email data to edit */
  @Input() json : IEmailData = null;


  imageRequestId:number;

  /**Contains the current selected element so that we can change the toolbar accordingly */
  selectedElem:number = 0;




  html:string = "";

  trustedHtml2 : SafeHtml = "";

  constructor(
    private sanitize: DomSanitizer,
    public service: KiiEmailTemplateService,
    ) { 
      super();
      this.service.initialize(this.json);
      //Emit image request if required
      this.service.imageRequest.subscribe(res => {
        this.imageRequestId = res;
        this.onRequestImage.emit(true);
      })
    }



  ngOnInit() {
     //Initialize the template with a new one
    this.selectedElem = 0;
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.resultImage) {
      this.service.image = changes.resultImage.currentValue;
      this.service.isImageAvailable.next(this.imageRequestId);
    }
    if (changes.json && changes.json.firstChange) {
      this.json = changes.json.currentValue;
      this.service.initialize(this.json);
    }
  }



  /**Selects current object id */
  selectBlock(id:number) {
    let block = this.service._findId(id);
    for(let cell of block.cells) {
      if (cell.id == this.selectedElem) return;
      if (cell.widgets.findIndex(obj=>obj.id == this.selectedElem)>=0) return;
    }
    this.selectedElem=id;
  }

  /**Selects cell if it's block is enabled or other cell of same block is active*/
  selectCell(id:number) {
    let parent = <IEmailBlock>this.service.getParent(id);
    if (parent.id == this.selectedElem) {
      this.selectedElem=id;
    }
    if (parent.cells.findIndex(obj=>obj.id == this.selectedElem)>=0) {
      this.selectedElem=id;
    }
  }

  /**Selects widget if its cell is active or other widget of cell active*/
  selectWidget(id:number) {
    let parent = <IEmailCell>this.service.getParent(id);
    if (parent.id == this.selectedElem) {
      this.selectedElem=id;
    }
    if (parent.widgets.findIndex(obj=>obj.id == this.selectedElem)>=0) {
      this.selectedElem=id;
    }
  }





  /**Returns container width for setting the max-width */
  getContainerWidth() {
    return this.service.getContainerWidth() + 'px';
  }

  getBlockClasses(block:IEmailBlock) {
    let result = {};
    result[block.format] = true;
    result['is-active'] = block.id == this.selectedElem?true:false;
    return result;
  }

  getCellClasses(cell:IEmailCell) {
    let result = {};
    result['is-active'] = cell.id == this.selectedElem?true:false;
    result['h-center'] = this.service.getAlignHorizontal(cell.id) == "center"?true:false;
    result['h-left'] = this.service.getAlignHorizontal(cell.id) == "left"?true:false;
    result['h-right'] = this.service.getAlignHorizontal(cell.id) == "right"?true:false;
    result['v-center'] = this.service.getAlignVertical(cell.id) == "middle"?true:false;
    result['v-bottom'] = this.service.getAlignVertical(cell.id) == "bottom"?true:false;
    result['v-top'] = this.service.getAlignVertical(cell.id) == "top"?true:false;
    return result;
  }

  /**Emit data to be saved */
  onSaveData() {
    this.onSave.emit(this.service.getJson());
  }

  /**When title changes */
  onTitleChange(title:any) {
    this.service.setTitle(title);
  }

}
