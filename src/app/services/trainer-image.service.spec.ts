import { TestBed } from '@angular/core/testing';

import { TrainerImageService } from './trainer-image.service';

describe('TrainerImageService', () => {
  let service: TrainerImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
