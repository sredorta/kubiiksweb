import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { MatDialog } from '@angular/material';
import { KiiImageGalleryDialogComponent } from '../kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { reject } from 'q';

@Component({
  selector: 'kii-admin-editor',
  templateUrl: './kii-admin-editor.component.html',
  styleUrls: ['./kii-admin-editor.component.scss']
})
export class KiiAdminEditorComponent  implements OnInit {

 /**Current content */
 @Input() content : string = "";

 /**Event generated each time the editor changes */
 @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

 /**Disk to use for storage */
 @Input() disk : DiskType = DiskType.CONTENT;

 /**ckeditor */
 public Editor = Editor;

 @ViewChild(CKEditorComponent,{static:false}) myEditor : CKEditorComponent;

 /**Editor configuration */
 public editorConfig = {};

 

  constructor(private dialog : MatDialog) { 
    let obj = this;
    this.editorConfig = {
                          imagePromiseConfig: {
                            getPromise: () => {
                              return new Promise((resolve) => {
                                 let ref = this.openDialog();
                                 ref.afterClosed().subscribe(res => {
                                   console.log(res);
                                   if (res) {
                                    resolve({
                                      src: this.disk.toString()
                                    });
                                   } else {
                                     reject({src:"cancel"});
                                   }
                                 })
                              });
                            }
                          },
                        };

  }

  ngOnInit() {

  }

  /**Initialize the editor */
  ngAfterViewInit() {
    this.init();
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.content) {
      this.content = changes.content.currentValue;
      this.init();
    }
    if (changes.disk) {
      this.disk = changes.disk.currentValue;
    }
  } 


  /**When the editor changes we keep sync article with current content of editor */
  onChangeContent(event:any) {
    if (this.myEditor)
     this.onChange.emit(this.myEditor.editorInstance.getData());
  }

  /**Fills content with init value */
  init() {
    setTimeout(()=> {
      if (this.myEditor) {
        console.log(this.myEditor);
        this.myEditor.editorInstance.setData(this.content);
        console.log(this.myEditor.editorInstance.config)
        console.log(this.myEditor.editorInstance.config)
      }
    });
  }

  openDialog() {
    return this.dialog.open(KiiImageGalleryDialogComponent);
  }
  



}

