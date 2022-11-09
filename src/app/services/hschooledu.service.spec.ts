import { TestBed } from '@angular/core/testing';

import { HschooleduService } from './hschooledu.service';

describe('HschooleduService', () => {
  let service: HschooleduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HschooleduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
