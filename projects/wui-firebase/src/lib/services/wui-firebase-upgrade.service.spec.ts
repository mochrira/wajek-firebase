import { TestBed } from '@angular/core/testing';

import { WuiFirebaseUpgradeService } from './wui-firebase-upgrade.service';

describe('WuiFirebaseUpgradeService', () => {
  let service: WuiFirebaseUpgradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseUpgradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
