import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAgricultureComponent } from './index-agriculture.component';

describe('IndexAgricultureComponent', () => {
  let component: IndexAgricultureComponent;
  let fixture: ComponentFixture<IndexAgricultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexAgricultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
