import { TestBed } from '@angular/core/testing';

import { WuiFirebaseLembagaService } from './wui-firebase-lembaga.service';

describe('WuiFirebaseLembagaService', () => {
  let service: WuiFirebaseLembagaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseLembagaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
