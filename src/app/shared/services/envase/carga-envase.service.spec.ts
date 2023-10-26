import { TestBed } from '@angular/core/testing';

import { CargaEnvaseService } from './carga-envase.service';

describe('CargaEnvaseService', () => {
  let service: CargaEnvaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaEnvaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
