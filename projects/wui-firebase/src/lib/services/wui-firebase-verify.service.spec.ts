import { TestBed } from '@angular/core/testing';

import { WuiFirebaseVerifyService } from './wui-firebase-verify.service';

describe('WuiFirebaseVerifyService', () => {
  let service: WuiFirebaseVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
