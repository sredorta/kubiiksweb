import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiAdminDiskService } from '../../services/kii-admin-disk.service';
import { IConfigImageUpload } from 'src/app/_features/form/components/kii-image-upload/kii-image-upload.component';

@Component({
  selector: 'kii-image-gallery-dialog',
  templateUrl: './kii-image-gallery-dialog.component.html',
  styleUrls: ['./kii-image-gallery-dialog.component.scss']
})
export class KiiImageGalleryDialogComponent extends KiiBaseAbstract implements OnInit {

  icons : any = {
    title: faHeading,
    url: faLink
  }

  /**Disk to use */
  configUpload : IConfigImageUpload = {}

  /**Contains the images available in the disk */
  images:string[] = [];

  /**When we are loading */
  isDataLoading:boolean =false;



  constructor(private dialogRef:MatDialogRef<KiiImageGalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private kiiDisk: KiiAdminDiskService
    ) { 
    super();  
    if (data && data.configUpload) {
      this.configUpload = data.configUpload;  
    }
  }



  ngOnInit() {
    this.getServerImages();
  }


  onClose() {
    this.dialogRef.close(null);
  }

  /**Gets the images from the server on the specified disk */
  getServerImages() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiDisk.getImages(this.configUpload.storage).subscribe(res => {
        this.images = res;
        this.isDataLoading = false;
      },() => this.isDataLoading = false)
    )
  }

  /**When image is selected */
  onImage(image:string) {
    this.dialogRef.close(image);
  }

  /**When new image has been uploaded */
  onUpload(image:string) {
    this.images.push(image);
  }

}
