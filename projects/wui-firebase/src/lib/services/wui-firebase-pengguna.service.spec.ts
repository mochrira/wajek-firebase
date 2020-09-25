import { TestBed } from '@angular/core/testing';

import { WuiFirebasePenggunaService } from './wui-firebase-pengguna.service';

describe('WuiFirebasePenggunaService', () => {
  let service: WuiFirebasePenggunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebasePenggunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
