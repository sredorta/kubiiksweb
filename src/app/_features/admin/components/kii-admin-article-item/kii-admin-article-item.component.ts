import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { KiiEditor } from '../../utils/kii-editor';
import { KiiAdminArticleService } from '../../services/kii-admin-article.service';
import { Article } from 'src/app/_features/main/models/article';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons/faFeatherAlt';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { MatDialog } from '@angular/material';
import { KiiConfirmDialogComponent } from 'src/app/_features/form/components/kii-confirm-dialog/kii-confirm-dialog.component';

@Component({
  selector: 'kii-admin-article-item',
  templateUrl: './kii-admin-article-item.component.html',
  styleUrls: ['./kii-admin-article-item.component.scss']
})
export class KiiAdminArticleItemComponent extends KiiBaseAbstract implements OnInit {

 /**Current article */
 @Input() article : Article = new Article(null);

 /**Contains saved article to cancel */
 savedArticle : Article = new Article(null);

 /**Editor configuration */
 editorConfig = KiiEditor.config();

 /**When we are saving the article */
 isDataLoading:boolean = false;

 /**When we are not editing */
 isEditing : boolean = false;
 icons :any = {
   edit: faEdit,
   public:faEye,
   private:faEyeSlash,
   up: faArrowUp,
   down: faArrowDown,
   created: faFeatherAlt,
   updated: faHistory,
   delete: faTrash
 }

  constructor(
    private kiiAdminArticle: KiiAdminArticleService,
    private dialog: MatDialog
    ) { super() }

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
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiAdminArticle.update(this.article).subscribe(res => {
        this.isDataLoading = false;
        this.isEditing = false;
        this.savedArticle = new Article({...this.article});
      }, ()=> this.isDataLoading = false)
    )
  }


  /**Toggles visibility */
  togglePublic() {
    this.article.public = !this.article.public;
    this.isDataLoading =true;
    this.addSubscriber(
      this.kiiAdminArticle.update(this.article).subscribe(res => {
        this.isDataLoading =false;
      },()=> this.isDataLoading=false)
    )
  }

  /**When article is deleted */
  onDelete() {
    console.log("WE are in onDelete")
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      disableClose:true,
      panelClass: "admin-theme",
      data: {text: "admin.article.delete.text"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        if (result) {
          this.isDataLoading = true;
          this.addSubscriber(
            this.kiiAdminArticle.delete(this.article).subscribe(res => {
                this.kiiAdminArticle.splice(this.article);
                this.isDataLoading = false;
            },() => this.isDataLoading = false))
          }
      })
    )
  }
}

