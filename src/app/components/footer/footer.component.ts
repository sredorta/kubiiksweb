import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Cookies } from 'src/app/_features/main/utils/cookies';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cookies:boolean = false;
  constructor(@Inject(PLATFORM_ID) private platform: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platform))
      this.cookies = Cookies.areAccepted();
  }

}
