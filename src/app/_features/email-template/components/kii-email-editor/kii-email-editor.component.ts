import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, SimpleChanges, ElementRef, ɵSafeHtml } from '@angular/core';
import { Location } from '@angular/common';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faPenNib } from '@fortawesome/free-solid-svg-icons/faPenNib';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { environment } from 'src/environments/environment.js';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract.js';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component.js';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiEmailTemplateService, EmailItem, IEmailItem, EItemType, EBlockType } from '../../services/kii-email-template.service';
import { KiiEmailItemComponent } from '../kii-email-item/kii-email-item.component';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'kii-email-editor',
  templateUrl: './kii-email-editor.component.html',
  styleUrls: ['./kii-email-editor.component.scss']
})
export class KiiEmailEditorComponent extends KiiFormAbstract implements OnInit {
  icons = [];
  @Input() item: EmailItem = new EmailItem(); //Here we should get a json and recreate from here for now empty


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();

  /**Request for a new image so that the dialog can be open */
  @Output() onRequestImage = new EventEmitter<boolean>();

  /**Result of the image uploaded */
  @Input() resultImage: string = null; 

  imageRequestId:number;

  html:string = "";
  json: IEmailItem ;

  trustedHtml2 : SafeHtml = "";

  constructor(
    private sanitize: DomSanitizer,
    private service: KiiEmailTemplateService,
    ) { 
      super();
      this.item = new EmailItem(
        {"id":6,"type":"container","position":0,"width":"600","bgColor":"#ff8000","txtColor":"#e4e4e4","font":"Verdana","fontSize":"18px","fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":7,"type":"block","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":8,"type":"cell","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":11,"type":"item","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":{"type":"text","content":{"textarea":"flkdsjdsflks fjkljsf lsafkdj lfksdj sdflkj sfdlk"}},"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"center","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"},{"id":9,"type":"block","position":2,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[{"id":10,"type":"cell","position":1,"width":"100%","bgColor":null,"txtColor":null,"font":null,"fontSize":null,"fontBold":null,"fontItalic":null,"fontUnderline":null,"childs":[],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"hAlign":"left","vAlign":"top"}],"widget":null,"paddingBottom":9,"paddingTop":9,"paddingLeft":10,"paddingRight":11,"hAlign":"left","vAlign":"top"}

)
      this.item.isActive = true;
      
      //Emit image request if required
      this.service.imageRequest.subscribe(res => {
        this.imageRequestId = res;
        this.onRequestImage.emit(true);
      })
    }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.item);
  }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.resultImage) {
      this.service.image = changes.resultImage.currentValue;
      this.service.isImageAvailable.next(this.imageRequestId);
    }
  }

  /**Returns container width for setting the max-width */
  getContainerWidth() {
    return this.item.getData().width + 'px';
  }

  outputData() {
    console.log(this.item.getJson());
    this.json = <IEmailItem>JSON.parse(this.item.getJson());
  }

  /**This needs to go in server */
  outputHtml() {
    this.json = <IEmailItem>JSON.parse(this.item.getJson());
    console.log(this.json);
    this._addHeading();
    this._addStyle();
    this._addBodyStart();
    //this._addContent();
    this._addBodyEnd();
    console.log(this.html);
    this.trustedHtml2 = this.sanitize.bypassSecurityTrustHtml(this.html);
  }

  private _addHeading() {
    this.html = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
    `;
  }
  private _addStyle() {
    this.html = this.html + `
    <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }

        table, tr, td {
          vertical-align: top;
          border-collapse: collapse;
          border:1px solid red;
        }

        p, ul {
          margin: 0;
        }

        .ie-container table, .mso-container table {
          table-layout: fixed;
        }

        * {
        line-height: inherit;
        }

        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }

        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%;
        }

        [owa] .email-row .email-col {
          display: table-cell;
          float: none !important;
          vertical-align: top;
        }

        .ie-container .email-col-100, .ie-container .email-row, [owa] .email-col-100, [owa] .email-row { width: 500px !important; }
        .ie-container .email-col-17, [owa] .email-col-17 { width: 85px !important; }
        .ie-container .email-col-25, [owa] .email-col-25 { width: 125px !important; }
        .ie-container .email-col-33, [owa] .email-col-33 { width: 165px !important; }
        .ie-container .email-col-50, [owa] .email-col-50 { width: 250px !important; }
        .ie-container .email-col-67, [owa] .email-col-67 { width: 335px !important; }

        @media only screen and (min-width: 520px) {
        .email-row { width: 500px !important; }
        .email-row .email-col { vertical-align: top; }
        .email-row .email-col-100 { width: 500px !important; }
        .email-row .email-col-67 { width: 335px !important; }
        .email-row .email-col-50 { width: 250px !important; }
        .email-row .email-col-33 { width: 165px !important; }
        .email-row .email-col-25 { width: 125px !important; }
        .email-row .email-col-17 { width: 85px !important; }
        }

        @media (max-width: 520px) {
        .email-row-container {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .email-row .email-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .email-row { width: calc(100% - 40px) !important; }
        .email-col { width: 100% !important; }
        .email-col > div { margin: 0 auto; }
        .no-stack .email-col { min-width: 0 !important; display: table-cell !important; }
        .no-stack .email-col-50 { width: 50% !important; }
        .no-stack .email-col-33 { width: 33% !important; }
        .no-stack .email-col-67 { width: 67% !important; }
        .no-stack .email-col-25 { width: 25% !important; }
        .no-stack .email-col-17 { width: 17% !important; }
        }

        @media (max-width: 480px) {
        .hide-mobile {
          display: none !important;
          max-height: 0px;
          overflow: hidden;
        }
        }

        @media (min-width: 980px) {
        .hide-desktop {
          display: none !important;
          max-height: none !important;
        }
        }

  </style>
  </head>
    `;
  }

  /**Traces down from container to childs to find parent of id*/
  private _getParent(id:number) {
     function _findParent(elem:IEmailItem, id:number) {
        if (elem.childs.findIndex(obj=>obj.id == id)>=0) {
          return elem;
        }
        for (let child of elem.childs) {
          return _findParent(child,id);
        }
     }
     return _findParent(this.json,id);
  }

  /**Gets a property by tracing up items if is not defined */
  private _getProperty(elem:IEmailItem,property:string) {
    console.log("Finding property:",property)
    if (elem[property] && elem[property]!=null && elem[property]!=undefined) {
      console.log("Found ",elem[property]);
      return elem[property];
    }
    function _traceUp(elem:IEmailItem) {
        let parent = this._getParent(elem.id);
        if (parent[property] && parent[property]!=null && parent[property]!=undefined) {
          console.log("Found ",elem[property]);
          return parent[property];
        }
        if (parent.type == 'container') {
          console.log("Container and not found", null);
          return null;  
        }
        return _traceUp(parent);  
    }  
    return _traceUp(elem);
  }


  //TODO do it in a flexible way so that we concatenate, padding,fonts... with options
  /**Gets style and return a string so that is included in html */
  _getStyle(item:IEmailItem) {
    let style = "";
    let padding =`padding-top:${this.json.paddingTop}px;padding-left:${this.json.paddingLeft}px;padding-right:${this.json.paddingRight}px;padding-bottom:${this.json.paddingBottom}px;`;
    let fonts = `font-family:${this._getProperty(item,'font')};font-size:${this._getProperty(item,'fontSize')};font-color:${this._getProperty(item,'txtColor')};`;
    style = style.concat(padding,fonts);
    console.log("Final style",style);
    return style;
  }


  _addBodyStart() {
    this.html = this.html + `
      <div class="email-body" style="margin: 0px;padding: 0px;-webkit-text-size-adjust: 100%;background-color:${this.json.bgColor}">
      <table align="center" width=${this.json.width} cellspacing="0" cellpadding="0" style="width:${this.json.width}px;vertical-align: top;min-width: 320px;max-width:${this.json.width}px;margin: 0 auto;background-color: ${this.json.bgColor};">
        <tbody>
        <tr>
          <td style="${this._getStyle(this.json)}" valign="top" bgcolor=${this.json.bgColor} align="center">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
              <tbody>
                <tr>
                  <td style="${this._getStyle(this.json)}" valign="top" align="center">Test Email Sample | <a href="#" target="_blank" style="color:#0d1121; text-decoration:underline;">View Online</a></td>
                </tr>
              </tbody>  
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      `;
  }

  _addBodyEnd() {
    this.html = this.html + `
    </div>

    </html>
    `;
  }

  _addContent() {
    //Loop through blocks
    let blocks :any[] = [];
    this.json.childs.forEach(block => {
      console.log("BLOCK",block)
      blocks.push(this._addBlock(block));
    });
  }

  _addBlock(block:any) {
    block.htmlStart = `
    
    `;

    block.htmlEnd = `
    `;

    let cells :any[] = [];
    block.childs.forEach(cell => {
      cells.push(this._addCell(cell));
    });
  }

  _addCell(cell:any) {

  }


}

/*

<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
    

<div class="email-row-container" style="padding: 0px;background-color: transparent">
  <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="email-row">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="email-col email-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_text_1" class="u_content_text" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">This is a new Text block. Change the text. dfskljsfdlkjsfd lksfdjalkfsj sfladkjsdflakj sfdalkjfsda lkjsadf lkjfds lkfsdj lsfadkj lsdfk</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>

</html>
"*/