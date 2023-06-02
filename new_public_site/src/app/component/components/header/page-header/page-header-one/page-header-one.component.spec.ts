import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderOneComponent } from './page-header-one.component';

describe('PageHeaderOneComponent', () => {
  let component: PageHeaderOneComponent;
  let fixture: ComponentFixture<PageHeaderOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHeaderOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
