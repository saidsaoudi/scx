import { TestBed } from '@angular/core/testing';

import { UlcService } from './ulc.service';

describe('UlcService', () => {
  let service: UlcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
