import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import {DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'kii-header',
  templateUrl: './kii-header.component.html',
  styleUrls: ['./kii-header.component.scss']
})
export class KiiHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
  }

}