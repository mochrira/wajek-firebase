import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';
import { WuiFirebaseAuthService } from './wui-firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseUndanganService {

  constructor(
    private authService: WuiFirebaseAuthService,
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async verify(code) {
    await this.httpService.post(this.apiURL + 'undangan/verify', {code: code});
    return await this.authService.accountInfo();
  }

}
