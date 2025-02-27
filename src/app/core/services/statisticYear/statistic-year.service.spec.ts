import { TestBed } from '@angular/core/testing';

import { StatisticYearService } from './statistic-year.service';

describe('StatisticYearService', () => {
  let service: StatisticYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
