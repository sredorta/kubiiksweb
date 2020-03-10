import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, ElementRef, SimpleChanges } from '@angular/core';
import { KiiEmailTemplateService, EmailItem, EWidgetType, EmailWidget, IEmailWidget } from '../../services/kii-email-template.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';
import { npost } from 'q';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'kii-email-widget',
  templateUrl: './kii-email-widget.component.html',
  styleUrls: ['./kii-email-widget.component.scss']
})
export class KiiEmailWidgetComponent implements OnInit {
  icons : any = {
    edit: faEdit
  };
  @Input() widget: EmailWidget = new EmailWidget({type:EWidgetType.TEXT}); //Here we should get a json and recreate from here for now empty

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<IEmailWidget> = new EventEmitter<IEmailWidget>();

  trustedHtml:SafeHtml = ""; 
  untrustedHtml:String = "";

  @ViewChild('myTextArea',{static:false}) textarea : ElementRef;

  constructor(
    private sanitize: DomSanitizer,
    ) { 
      console.log("WIDGET is:",this.widget)
    }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.setInitialTextarea();
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.widget) {
      this.widget = changes.widget.currentValue;
      this.setInitialTextarea();
    }
  }


  setInitialTextarea() {
    this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(this.widget.getContent());
    //Replace any <p>.*</p> by \n for untrusted
    let content = this.widget.getContent();
    let tmp = content.split("/p>");
    content = "";
    tmp.forEach((value)=> {
      content = content + value.replace(/<p.*/g,'\n');
    })
    this.untrustedHtml = content;
  }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.widget);
  }

  openGallery() {
    console.log("Openning gallery !");
  }

  /**Override input enter */
  textareaKey(event:any) {
    if (event && event.key) {
      if (event.key == "Enter") {
        this.untrustedHtml = this.untrustedHtml + '\n';
      } else {
        this.untrustedHtml = this.textarea.nativeElement.value;
      }
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(this.untrustedHtml.replace(/\n/g,'<p style="margin-top:0px;margin-bottom:0px">&nbsp;</p>'))
      this.widget.setContent(this.untrustedHtml.replace(/\n/g,'<p style="margin-top:0px;margin-bottom:0px">&nbsp;</p>'));
      this.onChange.emit({type: this.widget.getType(), content:this.widget.getContent()});
    }
  }



  /**Gets classes for wrapper */
  getClasses() {
    let result = {};
    result[this.widget.getType()] = true;
    return result;
  }


}
