import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter, NgZone, forwardRef } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent, CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { MatDialog } from '@angular/material';
import { KiiImageGalleryDialogComponent } from '../kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { reject } from 'q';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';

@Component({
  selector: 'kii-admin-editor',
  templateUrl: './kii-admin-editor.component.html',
  styleUrls: ['./kii-admin-editor.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiiAdminEditorComponent),
      multi: true
    }
  ]
})
export class KiiAdminEditorComponent  implements OnInit, ControlValueAccessor {

 /**Current content */
 @Input() content : string = "";

 /**Event generated each time the editor changes */
 @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

 /**Disk to use for storage */
 @Input() uploadConfig : IConfigImageUpload = {};

 /**ckeditor */
 public Editor = Editor;

 /**Editor Instance */
 private editorInstance : CKEditor5.Editor = null;

 
 /**Editor configuration */
 public editorConfig = {};

 

  constructor(
    private dialog : MatDialog, 
    private zone : NgZone,
    ) { 
    //We need to return a promise and the code inside the promise needs to run inside angular zone
    this.editorConfig = {
          imagePromiseConfig: {
              getPromise: () =>
                  new Promise((resolve) => {
                                 this.zone.run(() => {
                                    let ref = this.openDialog();
                                      ref.afterClosed().subscribe(res => {
                                          if (res) {
                                          resolve({
                                            src: res
                                          });
                                          } else {
                                            reject({});
                                          }
                                      })
                                 });

                  })             
          },
    };
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

  openDialog() {
    return this.dialog.open(KiiImageGalleryDialogComponent, {
      data: {configUpload:this.uploadConfig},
      scrollStrategy: new NoopScrollStrategy(),
      minWidth:"320px",
      panelClass:"admin-theme"
    });
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

