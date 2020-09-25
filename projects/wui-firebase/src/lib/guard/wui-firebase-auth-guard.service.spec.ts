import { TestBed } from '@angular/core/testing';

import { WuiFirebaseAuthGuardService } from './wui-firebase-auth-guard.service';

describe('AuthGuardService', () => {
  let service: WuiFirebaseAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
