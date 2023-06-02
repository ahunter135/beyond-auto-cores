import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionTwoComponent } from './call-action-two.component';

describe('CallActionTwoComponent', () => {
  let component: CallActionTwoComponent;
  let fixture: ComponentFixture<CallActionTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallActionTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallActionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
