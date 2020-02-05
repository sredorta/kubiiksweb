import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLoginComponent } from './kii-login.component';

describe('KiiLoginComponent', () => {
  let component: KiiLoginComponent;
  let fixture: ComponentFixture<KiiLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
