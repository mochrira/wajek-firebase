import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebasePenggunaService {

  constructor(
    @Inject('apiURL') private apiURL: string,
    private httpService: WuiFirebaseHttpService
  ) { }

  async result(offset = 0, limit = -1, q = '') {
    let params = {};
    if(limit > -1) {
      params['limit'] = limit;
      params['offset'] = offset;
    }
    if(q.length > 0) {
      params['search'] = q;
    }
    return await this.httpService.get(this.apiURL + 'pengguna', {
      params: params
    });
  }

  async row(uid: string): Promise<any> {
    return await this.httpService.get(this.apiURL + 'pengguna/' + uid);
  }

  async update(uid, data): Promise<any> {
    await this.httpService.patch(this.apiURL + 'pengguna/' + uid, data);
  }

  async delete(uid: string): Promise<any> {
    await this.httpService.delete(this.apiURL + 'pengguna/' + uid);
  }

}
