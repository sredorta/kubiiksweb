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
      maxWidth:'120px',
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

  onContentChange(value:any) {
    console.log("OnContentChange",value);
  }

}
