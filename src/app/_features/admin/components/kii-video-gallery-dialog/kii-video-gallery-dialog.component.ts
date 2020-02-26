import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

@Component({
  selector: 'kii-video-gallery-dialog',
  templateUrl: './kii-video-gallery-dialog.component.html',
  styleUrls: ['./kii-video-gallery-dialog.component.scss']
})
export class KiiVideoGalleryDialogComponent extends KiiFormAbstract implements OnInit {
  validator : Validators;
  icons :any = {
    video: faVideo
  }
  constructor(private dialogRef: MatDialogRef<KiiVideoGalleryDialogComponent>) { super(); }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      video: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("(https://www.youtube.com/.*)|(https://youtu.be/.*)|(https://vimeo.com/.*)"),
      ])),
    });
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSubmit(value:any) {
    if (this.myForm.valid) 
      this.dialogRef.close(value.video);
  }

}
