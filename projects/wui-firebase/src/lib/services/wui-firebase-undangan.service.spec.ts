import { TestBed } from '@angular/core/testing';

import { WuiFirebaseUndanganService } from './wui-firebase-undangan.service';

describe('WuiFirebaseUndanganService', () => {
  let service: WuiFirebaseUndanganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseUndanganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
