import { TestBed } from '@angular/core/testing';

import { EnvasesDataService } from './envases-data.service';

describe('EnvasesDataService', () => {
  let service: EnvasesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvasesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
