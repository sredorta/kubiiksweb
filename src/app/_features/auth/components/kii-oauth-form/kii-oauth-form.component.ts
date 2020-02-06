import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { KiiCustomValidators } from 'src/app/_features/form/utils/kii-custom-validators';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { KiiFormRestoreService } from 'src/app/_features/main/services/kii-form-restore.service';

@Component({
  selector: 'kii-oauth-form',
  templateUrl: './kii-oauth-form.component.html',
  styleUrls: ['./kii-oauth-form.component.scss']
})
export class KiiOauthFormComponent extends KiiFormAbstract implements OnInit {
  icon  = [];
  constructor(private kiiForm: KiiFormRestoreService) { 
    super(); 
    this.icon['email'] = faEnvelope;
    this.icon['password'] = faKey;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm =  new FormGroup({    
      newsletter: new FormControl('', Validators.compose([
      ])), 
      terms: new FormControl(false, Validators.compose([
        Validators.required,
        KiiCustomValidators.isBooleanTrue
      ]))
    });
    this.myForm.markAsTouched();
    //Restore values if any
    const restore = this.kiiForm.restore('oauth');
    if (restore) {
      for (const [control, value] of Object.entries(restore)) 
        if (value != "") 
          this.myForm.controls[control].setValue(value);
    } else {
      this.myForm.controls['newsletter'].patchValue(true);  
    }    
    this.kiiForm.store('oauth', {}); //Reset restore  
  }

  onRefuse() {
    this.kiiOnSubmit.emit(null);
  }

  /**Store form content as we move to legal so that when we are back we restore it */
  storeForm() {
      this.kiiForm.store('oauth', this.myForm.value);
  }
}
