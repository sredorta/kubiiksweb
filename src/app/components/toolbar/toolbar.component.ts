import { Component, OnInit } from '@angular/core';
import { KiiAuthService } from 'src/app/_features/main/services/kii-auth.service';
import { User } from 'src/app/_features/main/models/user';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends KiiBaseAbstract implements OnInit {



  constructor() { super() }

  ngOnInit() {

  }

}
