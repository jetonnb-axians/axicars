import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redrictGuard } from './redrict.guard';

describe('redrictGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redrictGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
