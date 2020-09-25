import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseUpgradeService {

  constructor(
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string
  ) { }

  async needUpgrade(): Promise<boolean> {
    let res: any = await this.httpService.get(this.apiURL + 'upgrade');
    return res.needUpgrade;
  }

  async upgrade() {
    return await this.httpService.post(this.apiURL + 'upgrade');
  }

}
