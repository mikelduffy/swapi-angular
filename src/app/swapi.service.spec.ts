import { TestBed, inject } from '@angular/core/testing';

import { SwapiService } from './swapi.service';

describe('SwapiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwapiService]
    });
  });

  it('should ...', inject([SwapiService], (service: SwapiService) => {
    expect(service).toBeTruthy();
  }));
});
