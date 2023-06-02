import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialTwoComponent } from './testimonial-two.component';

describe('TestimonialTwoComponent', () => {
  let component: TestimonialTwoComponent;
  let fixture: ComponentFixture<TestimonialTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
