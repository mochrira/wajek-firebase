import { Component, OnInit } from '@angular/core';
import { WuiService } from '@wajek/wui';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { Router } from '@angular/router';
import { WuiFirebaseUpgradeService } from '../../services/wui-firebase-upgrade.service';

@Component({
  selector: 'wui-firebase-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor(
    private wuiService: WuiService,
    private authService: WuiFirebaseAuthService,
    private upgradeService: WuiFirebaseUpgradeService,
    private router: Router
  ) { }

  async signOut() {
    let dialogResult = await this.wuiService.dialog({
      title: "Konfirmasi",
      message: "Anda yakin untuk keluar dari aplikasi",
      buttons: ["YA, KELUAR", "BATAL"]
    });
    if(dialogResult == 0) {
      await this.authService.signOut();
      this.router.navigate(['/landing']);
    }
  }

  async upgrade() {
    try {
      this.wuiService.openLoading();
      await this.upgradeService.upgrade();
      await this.authService.accountInfo();
      this.wuiService.closeLoading();
      this.router.navigate(['/home']);
    } catch(e) {
      this.wuiService.closeLoading();
      this.wuiService.dialog({title: 'Error', message: e.message, buttons: ["OK"]});
    }
  }

  ngOnInit(): void {
  }

}
