import { TestBed } from '@angular/core/testing';

import { PlaceRestService } from './place-rest.service';

describe('PlaceRestService', () => {
  let service: PlaceRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
