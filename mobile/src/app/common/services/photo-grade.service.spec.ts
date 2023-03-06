import { TestBed } from '@angular/core/testing';

import { PhotoGradeService } from './photo-grade.service';

describe('PhotoGradeService', () => {
  let service: PhotoGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
