import { TestBed } from '@angular/core/testing';

import { RadionicaService } from './radionica.service';

describe('RadionicaService', () => {
  let service: RadionicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadionicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
