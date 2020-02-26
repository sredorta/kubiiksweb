import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

@Component({
  selector: 'kii-image-gallery-dialog',
  templateUrl: './kii-image-gallery-dialog.component.html',
  styleUrls: ['./kii-image-gallery-dialog.component.scss']
})
export class KiiImageGalleryDialogComponent implements OnInit {

  type:string = "default";
  icons : any = {
    title: faHeading,
    url: faLink
  }

  constructor(private dialogRef:MatDialogRef<KiiImageGalleryDialogComponent>,@Inject(MAT_DIALOG_DATA) data:any) { 
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
  }


  onSubmit() {
    console.log("Submitting !");
    this.dialogRef.close("url_should_come_here")
  }

  onClose() {
    this.dialogRef.close(null);
  }

}
