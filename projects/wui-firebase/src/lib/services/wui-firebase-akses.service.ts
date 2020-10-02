import { Inject, Injectable } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAksesService {

  constructor(
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async result(offset = 0, limit = -1, q = '') {
    let params = {};
    if(limit > -1) {
      params['offset'] = offset;
      params['limit'] = limit;
    }
    if(q.length > 0) {
      params['search'] = q;
    }
    return await this.httpService.get(this.apiURL + 'akses', {
      params: params
    });
  }

  async row(idAkses) {
    return await this.httpService.get(this.apiURL + 'akses/' + idAkses);
  }

  async insert(data) {
    return await this.httpService.post(this.apiURL + 'akses', data);
  }

  async update(idAkses, data) {
    return await this.httpService.patch(this.apiURL + 'akses/' + idAkses, data);
  }

  async delete(idAkses) {
    return await this.httpService.delete(this.apiURL + 'akses/' + idAkses);
  }

}
