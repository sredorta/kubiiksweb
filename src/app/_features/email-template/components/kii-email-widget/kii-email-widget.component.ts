import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, SimpleChanges } from '@angular/core';
import { EmailItem, EWidgetType, IEmailWidget } from '../../services/kii-email-template.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { isNgTemplate } from '@angular/compiler';



@Component({
  selector: 'kii-email-widget',
  templateUrl: './kii-email-widget.component.html',
  styleUrls: ['./kii-email-widget.component.scss']
})
export class KiiEmailWidgetComponent implements OnInit {
  icons : any = {
    edit: faEdit,
    color:faTint
  };
  @Input() item: EmailItem = new EmailItem(); 

  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<IEmailWidget> = new EventEmitter<IEmailWidget>();

  trustedHtml:SafeHtml = ""; 
  untrustedHtml:String = "";

  color:string = "black";

  @ViewChild('myTextArea',{static:false}) textarea : ElementRef;

  constructor(
    private sanitize: DomSanitizer,
    ) { 
      console.log("WIDGET is:",this.item)
    }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.setInitial();
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.item) {
      this.item = changes.item.currentValue;
      console.log("ITEM CHANGED",this.item);
      this.setInitial();
    }
  }


  setInitial() {
    switch (this.item.widget.getType()) {
      case EWidgetType.TEXT: {
        let content = this.item.widget.getContent().textarea;
        if (!content) content = "";
        this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(content);
        //Replace any <p>.*</p> by \n for untrusted
        let tmp = content.split("/p>");
        content = "";
        tmp.forEach((value)=> {
          content = content + value.replace(/<p.*/g,'\n');
        })
        this.untrustedHtml = content;
        break;
      }
      case EWidgetType.BUTTON: {
        this.updateButton();
        break;
      }  
    }
  }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.item.widget);
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
      this.item.widget.setContent({textarea:this.untrustedHtml.replace(/\n/g,'<p style="margin-top:0px;margin-bottom:0px">&nbsp;</p>')});
      this.onChange.emit({type: this.item.widget.getType(), content:this.item.widget.getContent()});
    }
  }

  /**Gets classes for wrapper */
  getClasses() {
    let result = {};
    result[this.item.widget.getType()] = true;
    result['is-empty'] = this.item.widget.getContent()==null?true:false;
    return result;
  }

  /**When url changes */
  onUrlChange(event:string) {
    this.item.widget.getContent().url = event;
    this.updateButton();
  }
  /**When txt changes for the button*/
  onTxtChange(event:string) {
    this.item.widget.getContent().txtBtn = event;
    this.updateButton();
  }

  /**Stops event propagation */
/*  stopPropagation(event:any) {
    console.log("Stopping propagation !");
    event.stopPropagation();
  }*/

  /**When button color changes */
  onBtnColor(event:string) {
    this.item.widget.getContent().colorBtn = event;
    this.updateButton();
  }
  /**Sets the button style */
  setBtnType(type:'link' | 'flat' | 'stroked') {
    this.item.widget.getContent().typeBtn = type;
    this.updateButton();
  }

  /**Updates button content */
  updateButton() {
    console.log("TEXT COLOR:",this.item.getColor())
    if (this.item.widget.getContent().url.indexOf("http://") == 0 || this.item.widget.getContent().url.indexOf("https://") == 0) {
      switch(this.item.widget.getContent().typeBtn) {
        case 'flat':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}" target="_self" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:inherit !important;background-color: ${this.item.widget.getContent().colorBtn}; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
        case 'stroked':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}" target="_self" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.item.widget.getContent().colorBtn};border: ${this.item.widget.getContent().colorBtn} 3px solid; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
        default:
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}" target="_self" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:inherit !important; width: auto; padding: 0px 10px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
      }
      this.onChange.emit({type: this.item.widget.getType(), content:this.item.widget.getContent()});
    } else 
        this.trustedHtml = "";
  }


}
