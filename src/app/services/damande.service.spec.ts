import { TestBed } from '@angular/core/testing';

import { DamandeService } from './damande.service';

describe('DamandeService', () => {
  let service: DamandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
