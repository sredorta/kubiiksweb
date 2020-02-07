import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiEstablishPasswordFormComponent } from './kii-establish-password-form.component';

describe('KiiLoginFormComponent', () => {
  let component: KiiEstablishPasswordFormComponent;
  let fixture: ComponentFixture<KiiEstablishPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiEstablishPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiEstablishPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
