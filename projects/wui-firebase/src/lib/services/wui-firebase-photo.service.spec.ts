import { TestBed } from '@angular/core/testing';

import { WuiFirebasePhotoService } from './wui-firebase-photo.service';

describe('WuiFirebasePhotoService', () => {
  let service: WuiFirebasePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebasePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
