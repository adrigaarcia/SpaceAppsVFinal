import { TestBed } from '@angular/core/testing';

import { RocketLaunchDataService } from './rocket-launch-data.service';

describe('RocketLaunchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RocketLaunchDataService = TestBed.get(RocketLaunchDataService);
    expect(service).toBeTruthy();
  });
});
