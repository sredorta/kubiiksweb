import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiTransComponent } from './kii-trans.component';

describe('KiiTransComponent', () => {
  let component: KiiTransComponent;
  let fixture: ComponentFixture<KiiTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
