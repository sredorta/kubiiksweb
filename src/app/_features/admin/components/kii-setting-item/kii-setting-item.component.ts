import { Component, OnInit, Input } from '@angular/core';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { Setting } from 'src/app/_features/main/models/setting';
import { KiiAdminSettingService } from '../../services/kii-admin-setting.service';

@Component({
  selector: 'kii-setting-item',
  templateUrl: './kii-setting-item.component.html',
  styleUrls: ['./kii-setting-item.component.scss']
})
export class KiiSettingItemComponent extends KiiFormAbstract implements OnInit {

  @Input() setting : Setting = new Setting(null);
  @Input() hint:string = "myHint";

  icons = [];

  constructor(private kiiAdminSetting : KiiAdminSettingService) { 
    super();
    this.icons['save'] = faSave;
  }

  ngOnInit(): void {
    if (this.setting == undefined) this.setting = new Setting(null);
    this.myForm =  new FormGroup({
      result: new FormControl('', Validators.compose([]))
    });
  }

  onSubmit(value:any) {
    console.log("OnSubmit",value);
    this.setting.value = value.result;
    this.addSubscriber(
      this.kiiAdminSetting.update(this.setting).subscribe(res => {
      })
    )
  }

}
