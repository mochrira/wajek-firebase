import { Inject, Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseMessagingService {

  constructor(
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async updateToken(data) {
    return await this.httpService.post(this.apiURL + 'messaging', data);
  }

  async revokeToken() {
    return await this.httpService.delete(this.apiURL + 'messaging');
  }

}
