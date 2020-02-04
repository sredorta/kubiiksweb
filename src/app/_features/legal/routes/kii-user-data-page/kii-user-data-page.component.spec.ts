import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiUserDataPageComponent } from './kii-user-data-page.component';

describe('KiiUserDataPageComponent', () => {
  let component: KiiUserDataPageComponent;
  let fixture: ComponentFixture<KiiUserDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiUserDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiUserDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
