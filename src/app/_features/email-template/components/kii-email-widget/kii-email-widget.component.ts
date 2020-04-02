import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, SimpleChanges, HostListener, Renderer2 } from '@angular/core';
import { EWidgetType, IEmailWidget, KiiEmailTemplateService } from '../../services/kii-email-template.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { MatSliderChange } from '@angular/material';
import { faImages } from '@fortawesome/free-solid-svg-icons/faImages';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';



@Component({
  selector: 'kii-email-widget',
  templateUrl: './kii-email-widget.component.html',
  styleUrls: ['./kii-email-widget.component.scss']
})
export class KiiEmailWidgetComponent implements OnInit {
  icons : any = {
    edit: faEdit,
    color:faTint,
    bgcolor: faPalette,
    photo: faImages,
    image: faImage
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

  @ViewChild('contentElem',{static:false}) contentElem : ElementRef;
  @ViewChild(CKEditorComponent,{static:false}) myEditor : CKEditorComponent;
  /**Editor configuration */
  public editorConfig = {};


  constructor(
    private sanitize: DomSanitizer,
    public service: KiiEmailTemplateService,
    private r : Renderer2
    ) { 

      this.editorConfig = {
        toolbar: [
          'fontColor', 
          'fontBackgroundColor',
          'bold',
          'italic',
          'underline',
          'strikethrough'
        ]
      };
    }


  ngOnInit() {
      this.widget = this.service._findId(this.id);

      this.service.isImageAvailable.subscribe(res => {
        if (this.widget.id == res) {
            this.widget.imageUrl = this.service.image;
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
      case EWidgetType.IMAGE:
        if (!this.widget.imageUrl) result['is-empty'] = true;
        else if ( !(this.widget.imageUrl.indexOf("http://") == 0 || this.widget.imageUrl.indexOf("https://") == 0))  result['is-empty'] = true 
        break;
      default:
       if (!this.widget.url) result['is-empty'] = true;
       else
        if ( !(this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0))  result['is-empty'] = true 
    }
    return result;
  }


  /**When ckeditor changes */
  onChangeContent(event:any) {
      this.widget.textarea = event;
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(this.widget.textarea);
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
  setBtnType(type:'link' | 'flat' | 'stroked' | 'image_button') {
    this.widget.typeBtn = type;
    this.updateButton();
  }

  /**Updates button content */
  updateButton() {
      switch(this.widget.typeBtn) {
        case 'flat':
          if (this.widget.url && (this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0))
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}"  target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};background:${this.widget.bgColorBtn}; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
        case 'stroked':
          if (this.widget.url && (this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0))
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};border: ${this.widget.colorBtn} 3px solid; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
        case 'image_button':
          if (this.widget.url && (this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0)) 
          if (this.widget.imageUrl && (this.widget.imageUrl.indexOf("http://") == 0 || this.widget.imageUrl.indexOf("https://") == 0))
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};width: auto; padding: 5px; mso-border-alt: none;">
                <img src=${this.widget.imageUrl} style="height:auto;max-width:${this.widget.imgWidth}px;width:100%" title=${this.widget.txtBtn} alt=${this.widget.txtBtn}>
            </a>`
          );
          break;
        default:
         if (this.widget.url && (this.widget.url.indexOf("http://") == 0 || this.widget.url.indexOf("https://") == 0)) 
          this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
            `<a href="${this.widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${this.widget.colorBtn};width: auto; padding: 0px 10px; mso-border-alt: none;">
                <span style="line-height:120%;"><span>${this.widget.txtBtn}</span></span>
            </a>`
          );
          break;
      }
      this.onChange.emit(this.widget);
  }
  /**Updates image when new image is recieved or at initial stage*/
  updateImage() {
    if (this.widget.format == EWidgetType.IMAGE && this.widget.imageUrl)
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(
        `
        <img src=${this.widget.imageUrl} style="display:block;height:auto;max-width:${this.widget.imgWidth}px;width:100%" title=${this.widget.imgAlt} alt=${this.widget.imgAlt}>
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
  onImageWidthChangeInput(event: any) {
    if (event && event.srcElement && event.srcElement.valueAsNumber) {
      let value = event.srcElement.valueAsNumber;
      if (value>700) value=700;
      this.widget.imgWidth = value;
      if (this.isImage()) this.updateImage();
      if (this.isButton()) this.updateButton();
    }
  }


}
      
//      <img align="center" border="0" src="https://unros.png" alt="Image" title="Image" 
//style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;
//display: block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
 