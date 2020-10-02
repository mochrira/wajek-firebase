import { Lembaga } from '../models/lembaga';
import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseLembagaService {

  constructor(
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async result(offset = 0, limit = -1, q = '') {
    let params = {};
    if(limit > -1) {
      params['limit'] = limit;
      params['offset'] = offset;
    }
    if(q.length> 0) {
      params['search'] = q;
    }
    return await this.httpService.get(this.apiURL + 'lembaga', {
      params: params
    });
  }

  async row(idLembaga) {
    return await this.httpService.get(this.apiURL + 'lembaga/' + idLembaga);
  }

  async insert(data) {
    return await this.httpService.post(this.apiURL + 'lembaga', data);
  } 

  async update(idLembaga, data) {
    return await this.httpService.patch(this.apiURL + 'lembaga/' + idLembaga, data);
  }

  async delete(idLembaga) {
    return await this.httpService.delete(this.apiURL + 'lembaga/' + idLembaga);
  }

}
