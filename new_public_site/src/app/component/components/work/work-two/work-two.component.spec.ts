import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTwoComponent } from './work-two.component';

describe('WorkTwoComponent', () => {
  let component: WorkTwoComponent;
  let fixture: ComponentFixture<WorkTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
