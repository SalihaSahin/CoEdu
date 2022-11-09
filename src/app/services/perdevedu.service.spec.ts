import { TestBed } from '@angular/core/testing';

import { PerdeveduService } from './perdevedu.service';

describe('PerdeveduService', () => {
  let service: PerdeveduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerdeveduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
