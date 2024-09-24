import { TestBed } from '@angular/core/testing';

import { FlightTravelsService } from './flight-travels.service';

describe('FlightTravelsService', () => {
  let service: FlightTravelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightTravelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
