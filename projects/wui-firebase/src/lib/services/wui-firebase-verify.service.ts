import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';
import { WuiFirebaseAuthService } from './wui-firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseVerifyService {

  constructor(
    private authService: WuiFirebaseAuthService,
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async getPhoneToken(phoneNumber: string) {
    let res: any = await this.httpService.post(this.apiURL + 'verify/phone', {
      phoneNumber: phoneNumber
    });
    return res.token;
  }

  async verifyPhone(token: string, code: string) {
    await this.httpService.patch(this.apiURL + 'verify/phone', {token: token,code: code.toString()});
    return await this.authService.accountInfo();
  }

}
