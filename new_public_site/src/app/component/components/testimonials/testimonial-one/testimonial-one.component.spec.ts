import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialOneComponent } from './testimonial-one.component';

describe('TestimonialOneComponent', () => {
  let component: TestimonialOneComponent;
  let fixture: ComponentFixture<TestimonialOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
