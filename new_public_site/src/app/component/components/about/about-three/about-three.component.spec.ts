import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutThreeComponent } from './about-three.component';

describe('AboutThreeComponent', () => {
  let component: AboutThreeComponent;
  let fixture: ComponentFixture<AboutThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
