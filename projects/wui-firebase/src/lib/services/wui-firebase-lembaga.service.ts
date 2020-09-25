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

  async insert(lembaga: Lembaga): Promise<number> {
    let res: any = await this.httpService.post(this.apiURL + 'lembaga', lembaga.toJson());
    return res.idLembaga;
  }

}
