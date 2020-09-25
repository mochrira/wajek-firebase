import { TestBed } from '@angular/core/testing';

import { WuiFirebaseAuthService } from './wui-firebase-auth.service';

describe('WuiFirebaseAuthService', () => {
  let service: WuiFirebaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
