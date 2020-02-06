import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiOauthFormComponent } from './kii-oauth-form.component';

describe('KiiLoginFormComponent', () => {
  let component: KiiOauthFormComponent;
  let fixture: ComponentFixture<KiiOauthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiOauthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiOauthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
