import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkThreeComponent } from './work-three.component';

describe('WorkThreeComponent', () => {
  let component: WorkThreeComponent;
  let fixture: ComponentFixture<WorkThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
