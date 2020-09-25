import { TestBed } from '@angular/core/testing';

import { WuiFirebaseNologinGuardService } from './wui-firebase-nologin-guard.service';

describe('WuiFirebaseNologinGuardService', () => {
  let service: WuiFirebaseNologinGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseNologinGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
