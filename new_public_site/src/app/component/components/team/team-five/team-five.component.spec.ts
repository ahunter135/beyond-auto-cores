import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFiveComponent } from './team-five.component';

describe('TeamFiveComponent', () => {
  let component: TeamFiveComponent;
  let fixture: ComponentFixture<TeamFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
