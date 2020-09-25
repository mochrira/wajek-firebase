import { TestBed } from '@angular/core/testing';

import { WuiFirebaseMessagingService } from './wui-firebase-messaging.service';

describe('WuiFirebaseMessagingService', () => {
  let service: WuiFirebaseMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
