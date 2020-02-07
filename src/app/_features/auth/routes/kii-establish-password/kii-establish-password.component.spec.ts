import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEstablishPasswordComponent } from './kii-establish-password.component';

describe('KiiResetPasswordComponent', () => {
  let component: KiiEstablishPasswordComponent;
  let fixture: ComponentFixture<KiiEstablishPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEstablishPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEstablishPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
