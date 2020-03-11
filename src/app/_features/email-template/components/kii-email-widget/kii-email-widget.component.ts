import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, ElementRef, SimpleChanges } from '@angular/core';
import { KiiEmailTemplateService, EmailItem, EWidgetType, EmailWidget, IEmailWidget } from '../../services/kii-email-template.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';
import { npost } from 'q';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { url } from 'inspector';



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
  url:string = "test";
  txt:string = "button";

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
    let content = this.widget.getContent();
    if (!content) content = "";
    this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(content);
    //Replace any <p>.*</p> by \n for untrusted
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
    result['is-empty'] = this.widget.getContent()==null?true:false;
    return result;
  }

  /**When url changes */
  onUrlChange(event:string) {
    this.url = event;
    if (this.url.indexOf("http://") == 0 || this.url.indexOf("https://") == 0) {
        this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
          `<a href="${this.url}" target="_self" style="display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; padding: 10px 20px; mso-border-alt: none;">
              <span style="line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">${this.txt}</span></span>
          </a>`
        );
    } else 
        this.trustedHtml = "";
  }
  /**When txt changes for the button*/
  onTxtChange(event:string) {
    this.txt = event;
  }

}
