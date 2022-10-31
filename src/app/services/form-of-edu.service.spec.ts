import { TestBed } from '@angular/core/testing';

import { FormOfEduService } from './form-of-edu.service';

describe('FormOfEduService', () => {
  let service: FormOfEduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormOfEduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
