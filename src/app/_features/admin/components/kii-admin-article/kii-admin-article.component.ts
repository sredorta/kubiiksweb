import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Article } from 'src/app/_features/main/models/article';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { KiiEditor } from '../../utils/kii-editor';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';

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

 /**Editor configuration */
 editorConfig = KiiEditor.config();

 /**When we are saving the article */
 isLoading:boolean = false;

 /**When we are not editing */
 isEditing : boolean = false;
 icons :any = {
   edit: faEdit
 }

  constructor(private kiiAdminArticle: KiiAdminArticleService) { super() }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //this.update();
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.article) {
      this.article = changes.article.currentValue;
      if (this.article.exists() && !this.savedArticle.exists()){
        this.savedArticle = new Article({...this.article});
      }
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
}

