import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiNewsletterFormComponent } from './kii-newsletter-form.component';

describe('KiiNewsletterFormComponent', () => {
  let component: KiiNewsletterFormComponent;
  let fixture: ComponentFixture<KiiNewsletterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiNewsletterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiNewsletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
