import { TestBed } from '@angular/core/testing';

import { TrainerDetailService } from './trainer-detail.service';

describe('TrainerDetailService', () => {
  let service: TrainerDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
