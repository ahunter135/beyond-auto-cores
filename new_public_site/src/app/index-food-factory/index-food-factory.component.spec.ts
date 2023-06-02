import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFoodFactoryComponent } from './index-food-factory.component';

describe('IndexFoodFactoryComponent', () => {
  let component: IndexFoodFactoryComponent;
  let fixture: ComponentFixture<IndexFoodFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexFoodFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFoodFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
