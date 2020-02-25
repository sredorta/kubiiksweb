import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { DiskType } from 'src/app/_features/form/services/kii-api-upload-image.service';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

@Component({
  selector: 'app-kii-link-dialog',
  templateUrl: './kii-link-dialog.component.html',
  styleUrls: ['./kii-link-dialog.component.scss']
})
export class KiiLinkDialogComponent extends KiiFormAbstract implements OnInit {
  validator : Validators;
  validatorTitle: Validators;

  type:string = "default";
  icons : any = {
    title: faHeading,
    url: faLink
  }

  constructor(private dialogRef:MatDialogRef<KiiLinkDialogComponent>,@Inject(MAT_DIALOG_DATA) data:any) { 
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      url: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(http://|https://).*"),
      ])),
      class: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
    });
  }


  onSubmit(value:any) {
    console.log("Value is ",value)
    if (this.myForm.valid) 
      this.dialogRef.close(value);
  }

  onClose() {
    this.dialogRef.close(null);
  }

}
