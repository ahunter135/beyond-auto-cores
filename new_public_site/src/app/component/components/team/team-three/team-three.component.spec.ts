import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamThreeComponent } from './team-three.component';

describe('TeamThreeComponent', () => {
  let component: TeamThreeComponent;
  let fixture: ComponentFixture<TeamThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
