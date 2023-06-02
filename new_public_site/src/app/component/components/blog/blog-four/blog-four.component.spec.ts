import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFourComponent } from './blog-four.component';

describe('BlogFourComponent', () => {
  let component: BlogFourComponent;
  let fixture: ComponentFixture<BlogFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
