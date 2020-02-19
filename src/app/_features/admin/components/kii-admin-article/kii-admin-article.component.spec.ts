import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminArticleComponent } from './kii-admin-article.component';

describe('KiiArticleSsrComponent', () => {
  let component: KiiAdminArticleComponent;
  let fixture: ComponentFixture<KiiAdminArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
