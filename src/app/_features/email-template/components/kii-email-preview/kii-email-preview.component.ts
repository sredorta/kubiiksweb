import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input, SimpleChanges, ElementRef, ɵSafeHtml, ChangeDetectionStrategy } from '@angular/core';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract.js';
import { KiiEmailTemplateService, IEmailItem, EItemType, EBlockType, EWidgetType, IEmailData, IEmailBlock, IEmailCell, IEmailWidget, EElemType } from '../../services/kii-email-template.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'kii-email-preview',
  templateUrl: './kii-email-preview.component.html',
  styleUrls: ['./kii-email-preview.component.scss']
})
export class KiiEmailPreviewComponent extends KiiFormAbstract implements OnInit {
  icons = [];

  /**Scaling reducing factor */
  @Input() factor : number = 1;
  @Input() json: IEmailData;


  html:string = "";
  trustedHtml : SafeHtml = "";

  constructor(
    private sanitize: DomSanitizer,
    public service: KiiEmailTemplateService,
    ) { 
      super();
    }

  ngOnInit() {
    this.setJson(this.json);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.json) {
      this.setJson(changes.json.currentValue);
    }
  }

  /**Sets data */
  setJson(json:IEmailData) {
    console.log("SET JSON",json);
    //Do all the scaling
    if (json) {
      json.width = String(parseInt(json.width)/this.factor);
      this.json = json;
      console.log("Preview",this.json);
      this._addHeading();
      this._addStyle();
      this._addBody();
      console.log(this.html);
      this.trustedHtml = this.sanitize.bypassSecurityTrustHtml(this.html);
    }

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
        }
        table {
          border:1px solid red;
        }
        tr {
          border:1px solid blue;
        }
        td {
          border:1px solid green;
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
  _addBody() {
    this.html = this.html + `
      <div class="email-body" style="margin: 0px;padding: 0px;-webkit-text-size-adjust: 100%;background-color:${this.json.bgColor}">
      <table align="center" width=${this.json.width} cellspacing="0" cellpadding="0" style="width:${this.json.width}px;vertical-align: top;min-width: 320px;max-width:${this.json.width}px;margin: 0 auto;background-color: ${this.json.bgColor};">
        <tbody>
            ${this._addContent()}
        </tbody>
      </table>
      </div>
      </html>
      `;
  }


  _addContent() {
    //Loop through blocks and adds content
    let result = ""
    this.json.blocks.forEach(block => {
      console.log("Adding block",block);
        result = result.concat(
          `
          <table align="center" width="100%" cellspacing="0" cellpadding="0" style="width:${this.json.width}px;vertical-align: top;min-width: 320px;max-width:${this.json.width}px;margin: 0 auto;background-color: ${this.json.bgColor};">
          <tbody>
          <tr style="${this._getStyle(block.id)}">
          `);
        block.cells.forEach(cell => {
          result = result.concat(this._addCell(cell));
        });   
        result = result.concat(
          `
          </tr>
          </tbody>
          </table>  
          `);
      });   
    return result;
  }

  
  _addCell(cell:IEmailCell) {
    let result = `<td style="${this._getStyle(cell.id)}" valign="${this._getVAlign(cell)}" align="${this._getHAlign(cell)}">`;
    for (let item of cell.widgets) {
      result=result.concat(this._addItem(item));
    }
    result = result.concat(`</td>`);
    return result;
  }

  _addItem(widget:IEmailWidget) {
    if (widget) {
      switch (widget.format) {
        case EWidgetType.TEXT: {
          return widget.textarea;
        }
        case EWidgetType.BUTTON: {
          switch(widget.typeBtn) {
            case 'flat':
              return `<a href="${widget.url}"  target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${widget.colorBtn};background:${widget.bgColorBtn}; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                    <span style="line-height:120%;"><span>${widget.txtBtn}</span></span>
                </a>`;
            case 'stroked':
                return `<a href="${widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${widget.colorBtn};border: ${widget.colorBtn} 3px solid; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: auto; padding: 10px 20px; mso-border-alt: none;">
                    <span style="line-height:120%;"><span>${widget.txtBtn}</span></span>
                </a>`;
            default:
                return `<a href="${widget.url}" target="_self" onclick="return false;" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color:${widget.colorBtn};width: auto; padding: 0px 10px; mso-border-alt: none;">
                    <span style="line-height:120%;"><span>${widget.txtBtn}</span></span>
                </a>`;
          }
        }
        case EWidgetType.IMAGE: {
          return `
          <img src=${widget.url} style="display:block;height:auto;max-width:${widget.imgWidth}px;width:100%" title=${widget.imgAlt} alt=${widget.imgAlt}>
          `;
        }

      }
    }
  }

  _getVAlign(cell:IEmailCell) {
    return cell.vAlign;
  }
  _getHAlign(cell:IEmailCell) {
    return cell.hAlign;
  }

  _findById(id:number) {
    if (id == 0) return this.json;
    for (let block of this.json.blocks.sort((a,b)=> a.position>b.position?1:-1))  {
       if (block.id == id) return block;
       for (let cell of block.cells) {
         if (cell.id == id) return cell;
         for (let widget of cell.widgets.sort((a,b)=> a.position>b.position?1:-1)) {
           if (widget.id == id) return widget;
         }
       }
    }
    return this.json;
  }

  _getParent(id:number) {
    if (id == 0) return this.json;
    if (this.json.blocks.findIndex(obj=> obj.id == id)>=0) return this.json;
    else {
      for (let block of this.json.blocks) {
        if (block.cells.findIndex(obj=>obj.id ==id)>=0) return block;
        for (let cell of block.cells) {
          if (cell.widgets.findIndex(obj=>obj.id ==id)>=0) return cell;
        }
      }
    }
  }

  /**Returns property if defined or traces up until defined */
  _getPropertyValue(id:number, property:string) {
    let elem = this._findById(id);
    if (!elem) console.error("Element not found",id);
    if(!(elem[property]==null) && !(elem[property]==undefined)) {
      return elem[property];
    } else {
      let result = null;
      let myId = elem.id;
      while (result == null) {
        let parent = this._getParent(myId);
        if (parent[property]!=null && parent[property]!=undefined){
          return parent[property];
        }
        myId = parent.id;
      }
    }
  }


  /**Gets style and return a string so that is included in html */
  _getStyle(id:number) {
    let elem = this._findById(id);
    let style = "";
    //Fonts part
    let fonts = `font-family:${this._getPropertyValue(id,'font')};font-size:${this._getPropertyValue(id,'fontSize')};color:${this._getPropertyValue(id,'txtColor')};`;
    if (this._getPropertyValue(id,'fontBold')) fonts = fonts.concat('font-weight:bold;');
    if (this._getPropertyValue(id,'fontItalic')) fonts = fonts.concat('font-style:italic;');
    if (this._getPropertyValue(id,'fontUnderline')) fonts = fonts.concat('text-decoration:underline;');

    //background
    let background = `background-color:${this._getPropertyValue(id,'bgColor')};`;

    //size
    let width = `width:${this._getPropertyValue(id,'width')};`;

    let padding = "";
    let alignment = "";
    if (elem.type== EElemType.CELL) {
      padding =`padding-top:${elem.paddingTop}px;padding-left:${elem.paddingLeft}px;padding-right:${elem.paddingRight}px;padding-bottom:${elem.paddingBottom}px;`;
      alignment = `vertical-align:${elem.vAlign};text-align:${elem.hAlign}`;
    }
    style = style.concat(fonts,background,width,padding,alignment);

    console.log("Final style",style);
    return style;
  }


}
