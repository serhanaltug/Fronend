import { TestBed } from '@angular/core/testing';

import { RetailService } from './retail.service';

describe('RetailService', () => {
  let service: RetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
