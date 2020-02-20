import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminArticleItemComponent } from './kii-admin-article-item.component';

describe('KiiAdminArticleItemComponent', () => {
  let component: KiiAdminArticleItemComponent;
  let fixture: ComponentFixture<KiiAdminArticleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminArticleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
