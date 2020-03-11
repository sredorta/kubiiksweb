import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, SimpleChanges } from '@angular/core';
import { EmailItem, EWidgetType, IEmailWidget, KiiEmailTemplateService } from '../../services/kii-email-template.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { MatSliderChange } from '@angular/material';



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
  /**Item to work on */
  @Input() item: EmailItem = new EmailItem(); 

  /**Requests new image so that can be inserted */
  @Output() onRequestImage = new EventEmitter<number>();

  /**Contains the requested image */
  @Input() requestedImage: string;


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<IEmailWidget> = new EventEmitter<IEmailWidget>();

  trustedHtml:SafeHtml = ""; 
  untrustedHtml:String = "";

  color:string = "black";

  @ViewChild('myTextArea',{static:false}) textarea : ElementRef;

  constructor(
    private sanitize: DomSanitizer,
    private service: KiiEmailTemplateService
    ) { 
      console.log("WIDGET is:",this.item)
    }


  ngOnInit() {
      console.log("GENERATED ITEM:",this.item.widget);
      this.service.isImageAvailable.subscribe(res => {
        if (this.item.getData().id == res) {
            this.item.widget.getContent().url = this.service.image;
            this.service.image = null;
            this.updateImage();
            console.log(this.item.widget.getContent());
        }
      })
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.setInitial();
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.item) {
      this.item = changes.item.currentValue;
      this.setInitial();
      console.log("WIDGET:",this.item.widget.getContent())
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
      case EWidgetType.IMAGE: {
        this.updateImage();
        break;
      }
    }
  }

  /**Gets classes for wrapper */
  getClasses() {
    let result = {};
    result[this.item.widget.getType()] = true;
    switch (this.item.widget.getType()) {
      case EWidgetType.TEXT: 
        if (this.item.widget.getContent().textarea == "")  result['is-empty'] = true;
        break;
      default:
        if (!(this.item.widget.getContent().url.indexOf("http://") == 0 || this.item.widget.getContent().url.indexOf("https://") == 0))  result['is-empty'] = true 
    }
    return result;
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
    if (this.item.widget.getContent().url.indexOf("http://") == 0 || this.item.widget.getContent().url.indexOf("https://") == 0) {
      switch(this.item.widget.getContent().typeBtn) {
        case 'flat':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}"  target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:inherit !important;background-color: ${this.item.widget.getContent().colorBtn}; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
        case 'stroked':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.item.widget.getContent().colorBtn};border: ${this.item.widget.getContent().colorBtn} 3px solid; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
        default:
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.item.widget.getContent().url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:inherit !important; width: auto; padding: 0px 10px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.item.widget.getContent().txtBtn}</span></span>
            </a>`
          );
          break;
      }
      this.onChange.emit({type: this.item.widget.getType(), content:this.item.widget.getContent()});
    } else 
        this.trustedHtml = "";
  }
  /**Updates image when new image is recieved or at initial stage*/
  updateImage() {
    if (this.item.widget.getType() == EWidgetType.IMAGE && this.item.widget.getContent().url)
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
        `<img src=${this.item.widget.getContent().url} style="display: inline-block;height:auto;width:${this.item.widget.getContent().imgWidth}%" title=${this.item.widget.getContent().imgAlt} alt=${this.item.widget.getContent().imgAlt} width="${this.item.widget.getContent().imgWidth}%">`
      );
    this.onChange.emit({type: this.item.widget.getType(), content:this.item.widget.getContent()});

  }

  /**Requests image so that the dialog can be created */
  onNewImageRequested() {
    this.service.imageRequest.next(this.item.getData().id);
  }

  /**When alt text changes */
  onAltTxtChange(event:string) {
    this.item.widget.getContent().imgAlt = event;
    this.updateImage();
  }

  /**When image width changes */
  onImageWidthChange(event: MatSliderChange) {
    this.item.widget.getContent().imgWidth = event.value;
    this.updateImage();
  }


}
      
//      <img align="center" border="0" src="https://unros.png" alt="Image" title="Image" 
//style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;
//display: block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
 