import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListTwoComponent } from './blog-list-two.component';

describe('BlogListTwoComponent', () => {
  let component: BlogListTwoComponent;
  let fixture: ComponentFixture<BlogListTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
