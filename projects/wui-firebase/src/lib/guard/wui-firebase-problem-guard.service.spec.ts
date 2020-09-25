import { TestBed } from '@angular/core/testing';

import { WuiFirebaseProblemGuardService } from './wui-firebase-problem-guard.service';

describe('WuiFirebaseProblemGuardService', () => {
  let service: WuiFirebaseProblemGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseProblemGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
