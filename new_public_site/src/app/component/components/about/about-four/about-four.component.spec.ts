import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFourComponent } from './about-four.component';

describe('AboutFourComponent', () => {
  let component: AboutFourComponent;
  let fixture: ComponentFixture<AboutFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
