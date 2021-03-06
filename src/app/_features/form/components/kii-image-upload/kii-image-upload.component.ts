import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, SimpleChanges, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiApiUploadFileService, DiskType } from '../../services/kii-api-upload-image.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons/faRedoAlt';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { timingSafeEqual } from 'crypto';

export interface IConfigImageUpload {
  label?:string,
  hint?:string,
  /**Default image to use */
  defaultImage?:string,
  /**Buttons placement on the component */
  buttonsPosition?: 'bottom' | 'right',
  /**Do croping or not default is true */
  crop?:boolean,
  /**Maximum image size vertical or horizontal */
  maxSize?:number,
  /**When specified we do not regenerate a date and keep name */
  fileName?:string,    //When specified we do not regenerate a date name and keep this name
  /**Disk where to store images */
  storage?: DiskType,
  /**Compression rate for images, default is 0.9 */
  compression_rate?: number,
  /**Filter any image format default is all images */
  imageFormat?:string,
  /**Maximum width size of the preview */
  maxWidth?: string    //Max width of the image element
}

@Component({
  selector: 'kii-image-upload',
  templateUrl: './kii-image-upload.component.html',
  styleUrls: ['./kii-image-upload.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiiImageUploadComponent),
      multi: true
    }
  ]
})
export class KiiImageUploadComponent extends KiiBaseAbstract implements OnInit, ControlValueAccessor {

  /**Contains the icons */
  icons = [];

  /**Contains all the configuration */
  @Input() config : IConfigImageUpload; 

  /**Contains the current image */
  @Input() image : string;

  /**Emit link to the uploaded file */
  @Output() onUpload = new EventEmitter<string>();

  /** Contains the current image in base64 format*/
  base64:string = "";

  /**Defines if image has been selected and can be uploaded */
  isUploadable : boolean = false;

  /**Defines if the image has been uploaded or not */
  isUploaded : boolean = true;

  /**Contains original file name loaded */
  private _fileName : string = "";

  /**Show spinner when loading */
  isLoading:boolean = false;

  /**Upload progress */
  progress:number = 0;

  /**Contains svg blob */
  svgBlob : Blob = new Blob();

  /**Contains svgImage */
  svgImage : SafeUrl = null;

  /**Image link so that is send to form */
  formImage :string = null;

  /**Shadow canvas for image manipulation */
  @ViewChild('shadowCanvas', {static:false}) shadowCanvasElem : ElementRef; //Shadow canvas for manipulation
  @ViewChild('shadowImg', {static:false}) shadowImgElem : ElementRef; //Shadow image for manipulation

  constructor(private kiiApiUpload: KiiApiUploadFileService,private sanitizer: DomSanitizer) { 
    super();
    this.icons['reset'] = faTrash;
    this.icons['rotate'] = faRedoAlt;
    this.icons['photo'] = faCamera;
    this.icons['upload'] = faUpload;
  }

  ngOnInit() {
    if (this.image) this.formImage = this.image;
    //Set default config
    if (!this.config.defaultImage) this.config.defaultImage = './assets/kiilib/images/no-photo.svg';
    if (!this.config.buttonsPosition) this.config.buttonsPosition = "bottom";
    if (this.config.crop == undefined) this.config.crop = true;
    if (!this.config.maxSize) this.config.maxSize = 100;
    if (!this.config.storage) this.config.storage = DiskType.CONTENT;
    if (!this.config.compression_rate)  this.config.compression_rate = 0.9;
    if (!this.config.maxWidth) this.config.maxWidth = "100%";
    if (!this.config.imageFormat) this.config.imageFormat="image/*";
    if (!this.image) {
      this.image = this.config.defaultImage;
      this.svgImage = this.config.defaultImage;
    }
    this._fileName = this.image.replace(/.*\//,"");
  }

  ngAfterViewInit() {
    this.setInitialImage();
  }

  /**Returns if current file is SVG format */
  isSVG() {
      if (this._fileName.includes(".svg")) {
        return true;
      }
      return false;
  }
  
  /**Returns if current file is PNG format */
  private _isPNG() {
      if (this._fileName.includes(".png")) {
        return true;
      }
      return false;
  }

  /**When input image changes we reset everything */
  ngOnChanges(changes:SimpleChanges) {
    if (changes.image) {
      if (changes.image.currentValue != null) {
        this.formImage = this.image;
        this.image = changes.image.currentValue;
        this._fileName = this.image.replace(/.*\//,"");
        if (this.isSVG()) this.svgImage = this.image;
      } 
    }
  }

  getImage() {
    let result = this.config.defaultImage;
    if (this.image) result = this.image;
    else this.base64 = this.config.defaultImage;
    return result;
  }

  /**Sets the initial image */
  setInitialImage() {
    //Fill the canvas with the input image so that it can be rotated...
      this.shadowImgElem.nativeElement.onload = () => {
            this.shadowImgtoCanvas();
        };
  }

  /**Creates a copy of the shadow image into the canvas*/
  shadowImgtoCanvas() {
    var obj = this;
    var canvas = this.shadowCanvasElem;
    let myImage = new Image();
    myImage.crossOrigin = "anonymous";
    myImage.src = this.image;
    myImage.onload = function() {
        if (!obj.isSVG()) {
          if (obj.config.crop) obj.base64 =  obj._resizeAndCropCanvas(myImage,canvas); 
          else obj.base64 = obj._resizeCanvas(myImage,canvas); 
        } else {
          obj.base64=obj.image;
        }
    };
  }


  /**Loads the image file into the shadow */
  loadImage(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.svgBlob = file;
      var obj = this;
      reader.onloadend = () => {
          obj._fileName = event.target.files[0].name;
          if (!obj.isSVG())
            obj.image = reader.result.toString();
          else {
            obj.svgImage = obj.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
          }
          obj.isUploadable = true;
      };
    }
  }

  setBase64(base64:string) {
    this.base64 = base64;
  }


  /**Returns buttons position */
  getButtonsPosition() {
    if (!this.config.buttonsPosition) return "right";
    return this.config.buttonsPosition.toString();
  }

  /**Sets image to a new image */
  setImage(image:string) {
    this.image=image;
  }


  /**When image is rotated */
  rotateImage() {
    let obj = this;
    let myImage = new Image();
    myImage.src = this.base64;
    myImage.onload = function () {
      let result = obj._rotateImage(myImage,obj.shadowCanvasElem);
      obj.base64 = result;
      obj.isUploaded = false;
      obj.isUploadable = true;
    };
  }  

  /**When we remove the image */
  removeImage() {
    this.image = this.config.defaultImage;
    this.svgImage =  this.config.defaultImage;
    this._fileName = this.image.replace(/.*\//,"");
    this.setInitialImage();
    this.isUploadable = false;
    this.isUploaded = false;
    this.propagateChange(null);

  }


  //Give input image and canvas and resizes and returns base64
  private _resizeCanvas(img:HTMLImageElement,canvas:ElementRef) {

    let width : number = 0;
    let height : number = 0;
    var ctx = canvas.nativeElement.getContext("2d");
    if (img.width>this.config.maxSize || img.height>this.config.maxSize) {
      if (img.width>img.height) {
        width = this.config.maxSize;
        height = Math.round(img.height / (img.width / this.config.maxSize));
        canvas.nativeElement.width = width;
        canvas.nativeElement.height = height;
        ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
        ctx.drawImage(img, 0,0, img.width, img.height, 0, 0, width,height);
      } else {
        height = this.config.maxSize;
        width = Math.round(img.width / (img.height / this.config.maxSize));
        canvas.nativeElement.width = width;
        canvas.nativeElement.height = height;
        ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
        ctx.drawImage(img, 0,0, img.width, img.height, 0, 0, width,height);
      }
    } else {
      canvas.nativeElement.width = img.width;
      canvas.nativeElement.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    if (!this._isPNG())
      return canvas.nativeElement.toDataURL("image/jpeg",this.config.compression_rate);
    else {
      return canvas.nativeElement.toDataURL("image/png",1);
    }
  }




  /**Resizes and crops image */
  private _resizeAndCropCanvas(img:HTMLImageElement,canvas:ElementRef) {
    let sourceWidth = img.width;
    let sourceHeight = img.height;
    let sourceSize;
    var ctx = canvas.nativeElement.getContext("2d");

    if (sourceWidth>=sourceHeight) {
      var sourceX = (sourceWidth - sourceHeight)/2;
      var sourceY = 0;
      sourceSize=sourceHeight;
    } else {
        var sourceX = 0;
        var sourceY = (sourceHeight - sourceWidth)/2;
        sourceSize=sourceWidth;
    }    
    canvas.nativeElement.width = this.config.maxSize;
    canvas.nativeElement.height= this.config.maxSize;
    ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
    ctx.drawImage(img, sourceX,sourceY, sourceSize, sourceSize, 0, 0, this.config.maxSize,this.config.maxSize);
    //Disable compression now
   if (!this._isPNG)
    return canvas.nativeElement.toDataURL("image/jpeg",this.config.compression_rate);
   else
    return canvas.nativeElement.toDataURL("image/png",1);
  }

  /** Rotate the image by rotating the canvas */
  private _rotateImage(img:HTMLImageElement, canvas:ElementRef) {
    let angle = Math.PI / 2;
    canvas.nativeElement.width = img.height;
    canvas.nativeElement.height = img.width;
    let ch = canvas.nativeElement.width;
    let cw = canvas.nativeElement.height;
    var ctx = canvas.nativeElement.getContext("2d");
    ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
    // translate and rotate
    ctx.translate(canvas.nativeElement.width/2, canvas.nativeElement.height /2);
    ctx.rotate(angle);
    // draw the previows image, now rotated
    var delta = Math.abs(ch-cw)/2;
    if (cw>=ch){
      var origX = -(canvas.nativeElement.width/2) - delta ;
      var origY = -(canvas.nativeElement.height/2) + delta ;
    } else {
      var delta = Math.abs(ch-cw)/2;
      var origX = -(canvas.nativeElement.width/2) + delta;
      var origY = -(canvas.nativeElement.height/2) - delta ;
    } 
    ctx.drawImage(img, 0,0,img.width,img.height,origX,origY,img.width,img.height); 
    if (!this._isPNG)
      return canvas.nativeElement.toDataURL("image/jpeg",1);
    else
      return canvas.nativeElement.toDataURL("image/png",1);

  }



  upload() {
    if (!this.isSVG())
      fetch(this.base64).then(res => res.blob()).then(blob => {
        this.uploadFile(blob);
      })
    else  {
      this.uploadFile(this.svgBlob);  
    }
  }


  uploadFile(blob:Blob) {
    //Add random string on fileName so that we get unique name
    let tmp = this._fileName.split('.');
    this._fileName = tmp[0] + "__" + new Date().getTime() + '.' + tmp[1];
    const formData = new FormData();
    formData.append('file',blob,this.config.fileName==null?this._fileName:this.config.fileName);
    //Now upload
    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiUpload.uploadImage(this.config.storage,formData).subscribe((res:any) => {
        if (res.status == "completed") {
          this.formImage = res.message.imageUrl;
          this.onUpload.emit(res.message.imageUrl);
          this.propagateChange(res.message.imageUrl);
          this.isUploaded = true;
          this.isUploadable = false;
          this.isLoading = false;
        }
      }, () => this.isLoading = false)
    )
    this.addSubscriber(this.kiiApiUpload.getUploadProgress().subscribe(res => {
      this.progress = res;
    }))
  }

  ///////////////////////////////////////////////////////////////////////
  //Provide formControlName access
  ///////////////////////////////////////////////////////////////////////
  propagateChange = (_: any) => {};

  writeValue(obj: any) : void {
    this.formImage = obj;
    if (obj!=null) {
      this.svgImage = obj;
      this.image = obj;
    } else {
      this.svgImage = this.config.defaultImage;
      this.image = this.config.defaultImage;
    }
  }
  registerOnChange(fn: any) : void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) : void {}
}
