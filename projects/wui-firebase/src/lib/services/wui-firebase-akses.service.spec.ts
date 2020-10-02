import { TestBed } from '@angular/core/testing';
import { WuiFirebaseAksesService } from './wui-firebase-akses.service';

describe('WuiFirebaseJoinService', () => {
  let service: WuiFirebaseAksesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseAksesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
