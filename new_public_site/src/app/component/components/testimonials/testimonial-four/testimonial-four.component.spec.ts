import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialFourComponent } from './testimonial-four.component';

describe('TestimonialFourComponent', () => {
  let component: TestimonialFourComponent;
  let fixture: ComponentFixture<TestimonialFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
