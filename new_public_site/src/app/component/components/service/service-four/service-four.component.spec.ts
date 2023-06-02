import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFourComponent } from './service-four.component';

describe('ServiceFourComponent', () => {
  let component: ServiceFourComponent;
  let fixture: ComponentFixture<ServiceFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
