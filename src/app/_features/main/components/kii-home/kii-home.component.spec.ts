import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiHomeComponent } from './kii-home.component';

describe('KiiHomeComponent', () => {
  let component: KiiHomeComponent;
  let fixture: ComponentFixture<KiiHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
