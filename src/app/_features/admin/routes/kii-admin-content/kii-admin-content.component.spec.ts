import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminContentComponent } from './kii-admin-content.component';

describe('KiiAdminPopupComponent', () => {
  let component: KiiAdminContentComponent;
  let fixture: ComponentFixture<KiiAdminContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
