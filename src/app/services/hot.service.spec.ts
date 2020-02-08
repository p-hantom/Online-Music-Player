import { TestBed } from '@angular/core/testing';

import { HotService } from './hot.service';

describe('HotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotService = TestBed.get(HotService);
    expect(service).toBeTruthy();
  });
});
