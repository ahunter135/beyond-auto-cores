import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListOneComponent } from './blog-list-one.component';

describe('BlogListOneComponent', () => {
  let component: BlogListOneComponent;
  let fixture: ComponentFixture<BlogListOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
