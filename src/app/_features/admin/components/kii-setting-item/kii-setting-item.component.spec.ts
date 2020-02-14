import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSettingItemComponent } from './kii-setting-item.component';

describe('KiiSettingItemComponent', () => {
  let component: KiiSettingItemComponent;
  let fixture: ComponentFixture<KiiSettingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSettingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSettingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
