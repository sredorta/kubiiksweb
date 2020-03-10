import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Renderer2, Input } from '@angular/core';
import { KiiEmailTemplateService, EmailItem, EWidgetType, EmailWidget } from '../../services/kii-email-template.service';



@Component({
  selector: 'kii-email-widget',
  templateUrl: './kii-email-widget.component.html',
  styleUrls: ['./kii-email-widget.component.scss']
})
export class KiiEmailWidgetComponent implements OnInit {
  icons = [];
  @Input() widget: EmailWidget = new EmailWidget({type:EWidgetType.TEXT}); //Here we should get a json and recreate from here for now empty


  /**Event generated each time email changes */
  @Output() onChange :EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private service: KiiEmailTemplateService,
    ) { 
      console.log("WIDGET is:",this.widget)
    }



  ngOnInit() {
    console.log("GENERATED ITEM:",this.widget);
  }

  openGallery() {
    console.log("Openning gallery !");
  }


}
