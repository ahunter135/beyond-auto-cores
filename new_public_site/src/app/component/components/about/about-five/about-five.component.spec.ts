import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFiveComponent } from './about-five.component';

describe('AboutFiveComponent', () => {
  let component: AboutFiveComponent;
  let fixture: ComponentFixture<AboutFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
