import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter, NgZone, forwardRef } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent, CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { MatDialog } from '@angular/material';
import { reject } from 'q';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';

@Component({
  selector: 'kii-editor',
  templateUrl: './kii-editor.component.html',
  styleUrls: ['./kii-editor.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiiEditorComponent),
      multi: true
    }
  ]
})
export class KiiEditorComponent  implements OnInit, ControlValueAccessor {

 /**Current content */
 @Input() content : string = "";

 /**Event generated each time the editor changes */
 @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

 @Output() onKeyUp :EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();


 /**Disk to use for storage */
 @Input() uploadConfig : IConfigImageUpload = {};

 /**ckeditor */
 public Editor = Editor;


 /**Editor configuration */
 public editorConfig = {
      toolbar: [
        'fontColor', 
        'fontBackgroundColor',
        'bold',
        'italic',
        'underline',
        'strikethrough'
      ],
 }

 /**Editor Instance */
 private editorInstance : CKEditor5.Editor = null;

  constructor(
    private dialog : MatDialog, 
    private zone : NgZone,
    ) { 
  }

  ngOnInit() {

  }

  /**On Editor ready fill with initial content*/
  onEditorReady(editorInstance: CKEditor5.Editor) {
    console.log("editor",editorInstance);
    this.editorInstance = editorInstance;
    this.editorInstance.setData(this.content);
  }


  /**When the editor changes we keep sync article with current content of editor */
  onChangeContent(event:any) {
    if (this.editorInstance) {
     this.onChange.emit(this.editorInstance.getData());
     this.propagateChange(this.editorInstance.getData());
    }
  }




  ///////////////////////////////////////////////////////////////////////
  //Provide formControlName access
  ///////////////////////////////////////////////////////////////////////
  propagateChange = (_: any) => {};

  writeValue(obj: any) : void {
    this.content = obj;
  }
  registerOnChange(fn: any) : void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) : void {}

}

