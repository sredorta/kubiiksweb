import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, SimpleChanges, HostListener, Renderer2 } from '@angular/core';
import { EWidgetType, IEmailWidget, KiiEmailTemplateService } from '../../services/kii-email-template.service';
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
  @Input() id: number; 

  /**When element is active */
  @Input() isActive : boolean = false;

  /**Contains current widget data */
  widget: IEmailWidget = null;


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<IEmailWidget> = new EventEmitter<IEmailWidget>();

  trustedHtml:SafeHtml = ""; 
  untrustedHtml:String = "";
  color:string = "black";

  @ViewChild('myTextArea',{static:false}) textarea : ElementRef;
  @ViewChild('contentElem',{static:false}) contentElem : ElementRef;



  constructor(
    private sanitize: DomSanitizer,
    private service: KiiEmailTemplateService,
    private r : Renderer2
    ) { 
    }


  ngOnInit() {
      this.widget = this.service._findId(this.id);

      this.service.isImageAvailable.subscribe(res => {
        if (this.widget.id == res) {
            this.widget.url = this.service.image;
            this.service.image = null;
            this.updateImage();
        }
      })
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.setInitial();
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.isActive) {
      this.isActive = changes.isActive.currentValue;
    }
    if (changes.id) {
      this.id = changes.id.currentValue;
      this.widget = this.service._findId(this.id);
      this.setInitial();
    }
  }

  isText() {
    return this.widget.format==EWidgetType.TEXT;
  }
  isButton() {
    return this.widget.format == EWidgetType.BUTTON;
  }
  isImage() {
    return this.widget.format == EWidgetType.IMAGE;
  }


  setInitial() {
    if (this.widget) {
      switch (this.widget.format) {
        case EWidgetType.TEXT: {
          let content = this.widget.textarea;
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
  }

  /**Gets classes for wrapper */
  getClasses() {
    let result = {};
    result[this.widget.format] = true;
    switch (this.widget.format) {
      case EWidgetType.TEXT: 
        if (this.widget.textarea == "")  result['is-empty'] = true;
        break;
      default:
       if (!this.widget.url) result['is-empty'] = true;
       else
        if ( !(this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0))  result['is-empty'] = true 
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
      this.widget.textarea = this.untrustedHtml.replace(/\n/g,'<p style="margin-top:0px;margin-bottom:0px">&nbsp;</p>');
      this.onChange.emit(this.widget);
    }
  }



  /**When url changes */
  onUrlChange(event:string) {
    this.widget.url = event;
    this.updateButton();
  }
  /**When txt changes for the button*/
  onTxtChange(event:string) {
    this.widget.txtBtn = event;
    this.updateButton();
  }


  /**When button color changes */
  onBtnColor(event:string) {
    this.widget.colorBtn = event;
    this.updateButton();
  }

  /**When button color changes */
  onBtnBgColor(event:string) {
    this.widget.bgColorBtn = event;
    this.updateButton();
  }  

  /**Sets the button style */
  setBtnType(type:'link' | 'flat' | 'stroked') {
    this.widget.typeBtn = type;
    this.updateButton();
  }

  /**Updates button content */
  updateButton() {
    if (this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0) {
      switch(this.widget.typeBtn) {
        case 'flat':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}"  target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};background:${this.widget.bgColorBtn}; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
        case 'stroked':
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};border: ${this.widget.colorBtn} 3px solid; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
        default:
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};width: auto; padding: 0px 10px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
      }
      this.onChange.emit(this.widget);
    } else 
        this.trustedHtml = "";
  }
  /**Updates image when new image is recieved or at initial stage*/
  updateImage() {
    if (this.widget.format == EWidgetType.IMAGE && this.widget.url)
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
        `
        <img src=${this.widget.url} style="display:block;height:auto;max-width:${this.widget.imgWidth}px;width:100%" title=${this.widget.imgAlt} alt=${this.widget.imgAlt}>
        `
      );
    this.onChange.emit(this.widget);
  }

  /**Requests image so that the dialog can be created */
  onNewImageRequested() {
    this.service.imageRequest.next(this.widget.id);
  }

  /**When alt text changes */
  onAltTxtChange(event:string) {
    this.widget.imgAlt = event;
    this.updateImage();
  }

  /**When image width changes */
  onImageWidthChange(event: MatSliderChange) {
    this.widget.imgWidth = event.value;
    this.updateImage();
  }

  


}
      
//      <img align="center" border="0" src="https://unros.png" alt="Image" title="Image" 
//style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;
//display: block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
 