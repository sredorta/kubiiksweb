import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, SimpleChanges } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from '../../models/article';

@Component({
  selector: 'kii-article-summary',
  templateUrl: './kii-article-summary.component.html',
  styleUrls: ['./kii-article-summary.component.scss']
})
export class KiiArticleSummaryComponent extends KiiBaseAbstract implements OnInit {

  /**Defines if description is trimmed by number */
  @Input() descriptionTrimLength : number = null;

  /**Current article that we are editing */
  @Input() article : Article = new Article(null);

 


  constructor() {super()}

  ngOnInit() {
  
  }

  ngAfterViewInit() {
    //this.update();
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.article) {
      this.article = changes.article.currentValue;
      //this.update();
    }
  } 

  update() {
    //if (this.textArea)
      //this.textArea.nativeElement.innerHTML = this.article.content;
  }
  /**Trims description to have always same length*/
  trimDescription(description:string) {
    if (!description) return "";
    if (!this.descriptionTrimLength) return description;
    let result = "";
    if (description.length > this.descriptionTrimLength) {
      result = description.substr(0, this.descriptionTrimLength) + " ...";
    } else {
      result = description;
    }
    return result;
  }



}
