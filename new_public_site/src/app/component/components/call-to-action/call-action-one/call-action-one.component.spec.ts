import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionOneComponent } from './call-action-one.component';

describe('CallActionOneComponent', () => {
  let component: CallActionOneComponent;
  let fixture: ComponentFixture<CallActionOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallActionOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallActionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
