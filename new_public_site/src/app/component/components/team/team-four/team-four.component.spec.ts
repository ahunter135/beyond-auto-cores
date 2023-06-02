import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFourComponent } from './team-four.component';

describe('TeamFourComponent', () => {
  let component: TeamFourComponent;
  let fixture: ComponentFixture<TeamFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
