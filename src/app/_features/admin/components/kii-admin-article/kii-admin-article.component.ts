import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';

@Component({
  selector: 'kii-admin-article',
  templateUrl: './kii-admin-article.component.html',
  styleUrls: ['./kii-admin-article.component.scss']
})
export class KiiAdminArticleComponent extends KiiBaseAbstract implements OnInit {

 /**Current article */
 @Input() article : Article = new Article(null);

 /**Contains saved article to cancel */
 savedArticle : Article = new Article(null);

 /**When we are saving the article */
 isLoading:boolean = false;

 /**When we are not editing */
 isEditing : boolean = false;
 icons :any = {
   edit: faEdit
 }

 /**Upload images configuration */
 uploadConfig: IConfigImageUpload;


  constructor(private kiiAdminArticle: KiiAdminArticleService, private sanitizer: DomSanitizer) { super() }

  ngOnInit() {
    this.uploadConfig = {
      label:'admin.summary.image.t', 
      hint:'admin.summary.image.s',
      buttonsPosition:'right',
      storage: <DiskType>this.article.disk,
      maxWidth:'120px',
      maxSize:900,
      crop:false,
      defaultImage: './assets/kiilib/images/no-photo.svg'
    }
  }

  ngAfterViewInit() {
    //this.update();
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.article) {
      this.article = changes.article.currentValue;
      //this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
      if (this.article.exists() && !this.savedArticle.exists()){
        this.savedArticle = new Article({...this.article});
      }
      if (this.article.exists() && this.uploadConfig)
        this.uploadConfig.storage = <DiskType>this.article.disk;
    }
  } 

  onCancel() {
    this.isEditing = false;
    this.article = new Article({...this.savedArticle});
  }

  /**When we save the changes */
  onSave() {
    this.isLoading = true;
    this.addSubscriber(
      this.kiiAdminArticle.update(this.article).subscribe(res => {
        this.isLoading = false;
        this.isEditing = false;
        this.savedArticle = new Article({...this.article});
      }, ()=> this.isLoading = false)
    )
  }

  /**When the editor changes we keep sync article with current content of editor */
  onContentChange(data:string) {
    this.article.content = data;
  }

  /**Sets editing mode so that ckeditor is instantiated and filled with current data */
  setEditing() {
    this.isEditing = true;
  }
}

