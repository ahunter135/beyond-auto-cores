import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOneComponent } from './work-one.component';

describe('WorkOneComponent', () => {
  let component: WorkOneComponent;
  let fixture: ComponentFixture<WorkOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
