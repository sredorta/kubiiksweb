import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, Input } from '@angular/core';
import {DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';


export interface IHeader {
  title:string,
  subtitle:string,
  isShort?:boolean
}

@Component({
  selector: 'kii-header',
  templateUrl: './kii-header.component.html',
  styleUrls: ['./kii-header.component.scss']
})
export class KiiHeaderComponent implements OnInit {

  @Input() data: IHeader = {
    title:"title",
    subtitle:"subtitle",
    isShort:false
  };

  constructor() { }

  ngOnInit() {
      
  }

}