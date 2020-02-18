import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { KiiImageUploadComponent, IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';
import { Page } from '../../models/page';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiAdminPageService } from '../../services/kii-admin-page.service';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';

@Component({
  selector: 'kii-seo-form',
  templateUrl: './kii-seo-form.component.html',
  styleUrls: ['./kii-seo-form.component.scss']
})
export class KiiSeoFormComponent extends KiiFormAbstract implements OnInit {

  pages : Page[] =[];
  currentPage : Page = new Page(null);

  config : IConfigImageUpload = {
    label:"Sharing image",
    hint:"Page sharing image",
    buttonsPosition:  'right',
    crop:true,
    maxSize:1000,
    storage: DiskType.CONTENT,
    maxWidth: "150px"    //Max width of the image element
  }

  constructor(private kiiApiPage : KiiAdminPageService) {super(); }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm =  new FormGroup({    
      page: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),      
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),   
      image: new FormControl('', Validators.compose([])),
    });
    //Load current pages data
    this.addSubscriber(
      this.kiiApiPage.load().subscribe(res => {
        let result = [];
        for (let item of result) result.push(new Page(item));
        this.kiiApiPage.set(res);
      })
    )

    this.addSubscriber(
      this.kiiApiPage.onChange.subscribe(res => {
        let result = this.kiiApiPage.get();
        console.log("ONCHANGE", result);
        if (result.length>0) {
          this.pages = result;
          this.currentPage = this.pages[0]; //Set current page
          this.myForm.controls['page'].setValue(this.currentPage.page);
        }
      })
    )

  }

  /**When we change page */
  onPageChange(event:MatSelectChange) {
    this.currentPage = this.kiiApiPage.getByKey(event.value);
    console.log("CHAGED PAGE", this.currentPage);
    this.myForm.controls["image"].setValue(this.currentPage.image);
  }


  /**Patch the value of image once we recieve onUpload */
  onUpload(url:string) {
    this.myForm.controls["image"].setValue(url);
    this.myForm.markAsDirty();
  }


}

