import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSignupComponent } from './kii-signup.component';

describe('KiiSignupComponent', () => {
  let component: KiiSignupComponent;
  let fixture: ComponentFixture<KiiSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
