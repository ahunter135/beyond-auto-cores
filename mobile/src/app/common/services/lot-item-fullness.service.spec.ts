import { TestBed } from '@angular/core/testing';

import { LotItemFullnessService } from './lot-item-fullness.service';

describe('LotItemFullnessService', () => {
  let service: LotItemFullnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotItemFullnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
