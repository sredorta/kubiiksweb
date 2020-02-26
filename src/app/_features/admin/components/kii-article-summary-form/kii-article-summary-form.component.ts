import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import * as Editor from '../../../../../../../ckeditor5-build-classic/build/ckeditor.js';

@Component({
  selector: 'kii-article-summary-form',
  templateUrl: './kii-article-summary-form.component.html',
  styleUrls: ['./kii-article-summary-form.component.scss']
})
export class KiiArticleSummaryFormComponent extends KiiFormAbstract implements OnInit {

  @Input() article : Article = new Article(null);

  @Output() onChange = new EventEmitter<any>();
  @Output() kiiOnCancel = new EventEmitter<boolean>();

  /**ckeditor */
  public Editor = Editor;
 /**Editor configuration */
 public editorConfig = {
  imagePromiseConfig: {
    getPromise: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    src: 'https://lh5.ggpht.com/REQiWghvdKMWG1gyHoAfPoeV7_TM5ziu_a5glyeu3ku5obSXuyzZVPoiOM1aQwbAHDwgORh_trxoRybJUMar8KYSwXccAD5BFsVghJdNtg=s0'
                });
            }, 3000)
        });
    }
  },
};

  config: IConfigImageUpload;

  constructor() { 
    super(); 
  }

  ngOnInit() {
    this.config = {
      label:'admin.summary.image.t', 
      hint:'admin.summary.image.s',
      buttonsPosition:'right',
      storage: <DiskType>this.article.disk,
      maxWidth:'150px',
      maxSize:400,
      defaultImage: './assets/kiilib/images/no-photo.svg'
    }
    console.log(this.config);
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      image : new FormControl('', Validators.compose([
      ])),
      content: new FormControl('', Validators.compose([
      ])),

    });
    this.myForm.controls["image"].patchValue(this.article.image);
    
    //Emit changes each time the form changes
    this.addSubscriber(
      this.myForm.valueChanges.subscribe(res => {
        this.onChange.emit(res);
      })
    )
  }

  /**Patch the value of image once we recieve onUpload */
  onUpload(url:string) {
    this.myForm.controls["image"].setValue(url);
  }

  /**Emit that we are saving */
  onSubmit(value:any) {
    this.kiiOnSubmit.emit(value);
  }

  onCancel() {
    this.kiiOnCancel.emit(true);
  }


}
