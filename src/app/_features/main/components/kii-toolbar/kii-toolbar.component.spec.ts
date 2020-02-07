import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiToolbarComponent } from './kii-toolbar.component';

describe('ToolbarComponent', () => {
  let component: KiiToolbarComponent;
  let fixture: ComponentFixture<KiiToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
