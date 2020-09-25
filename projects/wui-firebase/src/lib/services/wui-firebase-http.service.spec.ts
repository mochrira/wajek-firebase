import { TestBed } from '@angular/core/testing';

import { WuiFirebaseHttpService } from './wui-firebase-http.service';

describe('WuiFirebaseHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseHttpService = TestBed.get(WuiFirebaseHttpService);
    expect(service).toBeTruthy();
  });
});
