import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialThreeComponent } from './testimonial-three.component';

describe('TestimonialThreeComponent', () => {
  let component: TestimonialThreeComponent;
  let fixture: ComponentFixture<TestimonialThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
