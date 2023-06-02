import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSteelPlantComponent } from './index-steel-plant.component';

describe('IndexSteelPlantComponent', () => {
  let component: IndexSteelPlantComponent;
  let fixture: ComponentFixture<IndexSteelPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexSteelPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSteelPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
