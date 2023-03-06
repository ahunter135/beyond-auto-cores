import { TestBed } from '@angular/core/testing';

import { LotItemsService } from './lot-items.service';

describe('LotItemsService', () => {
  let service: LotItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
