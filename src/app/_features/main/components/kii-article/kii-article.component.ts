import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from '../../models/article';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons/faFeatherAlt';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kii-article',
  templateUrl: './kii-article.component.html',
  styleUrls: ['./kii-article.component.scss']
})
export class KiiArticleComponent extends KiiBaseAbstract implements OnInit {

 /**Current article */
 @Input() article : Article = new Article(null);


 /**shows created bottom line info */
 @Input() showCreated :boolean = false;


 /**Contains current language for created */
 currentLang = this.translate.getCurrent();

 /**Trusted html */
 trustedHtml : SafeHtml = "";

 /**Contains icons */
 icons :any = {
   created: faFeatherAlt
 }

 articleChange$ = new BehaviorSubject<boolean>(true);

 @ViewChild('myEditor', {static: false}) textArea: ElementRef;

  constructor(private translate : KiiTranslateService,private sanitizer:DomSanitizer) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.translate.onChange.subscribe(res => {
        this.currentLang = this.translate.getCurrent();
      })
    )
    this.setHtml(this.article.content)
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.article) {
      this.article = changes.article.currentValue;
      this.setHtml(this.article.content);
    }
  } 

  /**Patches html by introducing lazy loading on images */
  setHtml(html:string) {
    if (html)
      html = html.replace(/<img src="/g,'<img src="/assets/kiilib/images/lazy.svg" data-src="');
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    this.articleChange$.next(true);
  }

}

