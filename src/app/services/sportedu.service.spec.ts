import { TestBed } from '@angular/core/testing';

import { SporteduService } from './sportedu.service';

describe('SporteduService', () => {
  let service: SporteduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SporteduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
