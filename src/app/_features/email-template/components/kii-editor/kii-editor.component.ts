import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter, NgZone, forwardRef } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
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

 @ViewChild(CKEditorComponent,{static:false}) myEditor : CKEditorComponent;




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
      fontColor: {
        columns: 5,
        documentColors: 200,
        colors: [
        {color: '#ffcccc',label:''},{color: '#ff6666',label:''},{color: '#ff0000',label:''},{color: '#990000',label:''},{color: '#330000',label:''},
        {color: '#ffe5cc',label:''},{color: '#ffb266',label:''},{color: '#ff8000',label:''},{color: '#994c00',label:''},{color: '#331900',label:''},
        {color: '#ffffcc',label:''},{color: '#ffff66',label:''},{color: '#ffff00',label:''},{color: '#999900',label:''},{color: '#333300',label:''},
        {color: '#e5ffcc',label:''},{color: '#b2ff66',label:''},{color: '#80ff00',label:''},{color: '#4c9900',label:''},{color: '#193300',label:''},
        {color: '#ccffcc',label:''},{color: '#66ff66',label:''},{color: '#00ff00',label:''},{color: '#009900',label:''},{color: '#003300',label:''},
        {color: '#ccffe5',label:''},{color: '#66ffb2',label:''},{color: '#00ff80',label:''},{color: '#00994c',label:''},{color: '#003319',label:''},
        {color: '#ccffff',label:''},{color: '#66ffff',label:''},{color: '#00ffff',label:''},{color: '#009999',label:''},{color: '#003333',label:''},
        {color: '#cce5ff',label:''},{color: '#66b2ff',label:''},{color: '#0080ff',label:''},{color: '#004c99',label:''},{color: '#001933',label:''},
        {color: '#ccccff',label:''},{color: '#6666ff',label:''},{color: '#0000ff',label:''},{color: '#000099',label:''},{color: '#000033',label:''},
        {color: '#e5ccff',label:''},{color: '#b266ff',label:''},{color: '#7f00ff',label:''},{color: '#4c0099',label:''},{color: '#190033',label:''},
        {color: '#ffccff',label:''},{color: '#ff66ff',label:''},{color: '#ff00ff',label:''},{color: '#990099',label:''},{color: '#330033',label:''},
        {color: '#ffcce5',label:''},{color: '#ff66b2',label:''},{color: '#ff007f',label:''},{color: '#99004c',label:''},{color: '#330019',label:''},
        {color: '#ffffff',label:''},{color: '#c0c0c0',label:''},{color: '#808080',label:''},{color: '#404040',label:''},{color: '#000000',label:''},
        ]
      },
      fontBackgroundColor: {
        columns: 5,
        documentColors: 200,
        colors: [
        {color: '#ffcccc',label:''},{color: '#ff6666',label:''},{color: '#ff0000',label:''},{color: '#990000',label:''},{color: '#330000',label:''},
        {color: '#ffe5cc',label:''},{color: '#ffb266',label:''},{color: '#ff8000',label:''},{color: '#994c00',label:''},{color: '#331900',label:''},
        {color: '#ffffcc',label:''},{color: '#ffff66',label:''},{color: '#ffff00',label:''},{color: '#999900',label:''},{color: '#333300',label:''},
        {color: '#e5ffcc',label:''},{color: '#b2ff66',label:''},{color: '#80ff00',label:''},{color: '#4c9900',label:''},{color: '#193300',label:''},
        {color: '#ccffcc',label:''},{color: '#66ff66',label:''},{color: '#00ff00',label:''},{color: '#009900',label:''},{color: '#003300',label:''},
        {color: '#ccffe5',label:''},{color: '#66ffb2',label:''},{color: '#00ff80',label:''},{color: '#00994c',label:''},{color: '#003319',label:''},
        {color: '#ccffff',label:''},{color: '#66ffff',label:''},{color: '#00ffff',label:''},{color: '#009999',label:''},{color: '#003333',label:''},
        {color: '#cce5ff',label:''},{color: '#66b2ff',label:''},{color: '#0080ff',label:''},{color: '#004c99',label:''},{color: '#001933',label:''},
        {color: '#ccccff',label:''},{color: '#6666ff',label:''},{color: '#0000ff',label:''},{color: '#000099',label:''},{color: '#000033',label:''},
        {color: '#e5ccff',label:''},{color: '#b266ff',label:''},{color: '#7f00ff',label:''},{color: '#4c0099',label:''},{color: '#190033',label:''},
        {color: '#ffccff',label:''},{color: '#ff66ff',label:''},{color: '#ff00ff',label:''},{color: '#990099',label:''},{color: '#330033',label:''},
        {color: '#ffcce5',label:''},{color: '#ff66b2',label:''},{color: '#ff007f',label:''},{color: '#99004c',label:''},{color: '#330019',label:''},
        {color: '#ffffff',label:''},{color: '#c0c0c0',label:''},{color: '#808080',label:''},{color: '#404040',label:''},{color: '#000000',label:''},
        ]
      },
 }

 

  constructor(
    private dialog : MatDialog, 
    private zone : NgZone,
    ) { 
  }

  ngOnInit() {

  }

  /**On Editor ready fill with initial content*/
  onEditorReady(editor: any) {
    if (this.myEditor) {
      this.myEditor.editorInstance.setData(this.content);
    }
  }


  /**When the editor changes we keep sync article with current content of editor */
  onChangeContent(event:any) {
    if (this.myEditor) {
     this.onChange.emit(this.myEditor.editorInstance.getData());
     this.propagateChange(this.myEditor.editorInstance.getData());
    }
  }




  ///////////////////////////////////////////////////////////////////////
  //Provide formControlName access
  ///////////////////////////////////////////////////////////////////////
  propagateChange = (_: any) => {};

  writeValue(obj: any) : void {
    console.log("SETTING VALUE",obj);
    this.content = obj;
  }
  registerOnChange(fn: any) : void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) : void {}

}

