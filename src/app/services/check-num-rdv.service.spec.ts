import { TestBed } from '@angular/core/testing';

import { CheckNumRdvService } from './check-num-rdv.service';

describe('CheckNumRdvService', () => {
  let service: CheckNumRdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckNumRdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
