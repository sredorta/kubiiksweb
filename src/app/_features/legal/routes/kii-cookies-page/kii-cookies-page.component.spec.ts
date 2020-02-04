import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiCookiesPageComponent } from './kii-cookies-page.component';

describe('KiiCookiesPageComponent', () => {
  let component: KiiCookiesPageComponent;
  let fixture: ComponentFixture<KiiCookiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiCookiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiCookiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
