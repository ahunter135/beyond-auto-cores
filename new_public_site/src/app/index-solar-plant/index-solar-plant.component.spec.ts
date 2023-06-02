import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSolarPlantComponent } from './index-solar-plant.component';

describe('IndexSolarPlantComponent', () => {
  let component: IndexSolarPlantComponent;
  let fixture: ComponentFixture<IndexSolarPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexSolarPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSolarPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
