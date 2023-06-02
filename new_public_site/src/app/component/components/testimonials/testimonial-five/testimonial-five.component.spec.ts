import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialFiveComponent } from './testimonial-five.component';

describe('TestimonialFiveComponent', () => {
  let component: TestimonialFiveComponent;
  let fixture: ComponentFixture<TestimonialFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
