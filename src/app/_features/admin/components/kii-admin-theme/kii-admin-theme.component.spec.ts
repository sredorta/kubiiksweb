import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminThemeComponent } from './kii-admin-theme.component';

describe('KiiInlineStyleComponent', () => {
  let component: KiiAdminThemeComponent;
  let fixture: ComponentFixture<KiiAdminThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
