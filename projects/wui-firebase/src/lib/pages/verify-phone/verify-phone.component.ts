import { Component, OnInit, Inject } from '@angular/core';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { Router } from '@angular/router';
import { WuiService } from '@wajek/wui';
import { WuiFirebaseVerifyService } from '../../services/wui-firebase-verify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wui-firebase-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  title: string;
  description: string;
  nomorInputDecoration: any;
  buttonText: string;

  token: string;
  formToken = new FormGroup({
    phoneNumber: new FormControl('', Validators.required)
  });

  formVerify = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  constructor(
    private authService: WuiFirebaseAuthService,
    private verifyService: WuiFirebaseVerifyService,
    private wuiService: WuiService,
    private router: Router,
    @Inject('wuiFirebaseDecoration') private decoration: any
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

  async getToken() {
    if(this.formToken.invalid) {
      this.wuiService.dialog({title: 'Error', message: 'Periksa kembali isian anda', buttons: ["OK"]});
      return;
    }
    try {
      this.wuiService.openLoading();
      this.token = await this.verifyService.getPhoneToken(this.formToken.controls['phoneNumber'].value);
      this.wuiService.closeLoading();
    } catch(e) {
      this.wuiService.closeLoading();
      this.wuiService.dialog({title: 'Error', message: e.error.msg || e.message, buttons: ["OK"]})
    }
  }

  async verify() {
    if(this.formVerify.invalid) {
      this.wuiService.dialog({title: 'Error', message: 'Periksa kembali isian anda', buttons: ["OK"]});
      return;
    }
    try {
      this.wuiService.openLoading();
      await this.verifyService.verifyPhone(this.token, this.formVerify.controls['code'].value);
      this.wuiService.closeLoading();
      this.router.navigate(['/home']);
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }else if(e.error.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/register/undangan']);
        } else {
          this.wuiService.dialog({title: 'Error', message: e.error.msg, buttons: ["OK"]})  
        }
      } else {
        this.wuiService.dialog({title: 'Error', message: e.message, buttons: ["OK"]})
      }
    }
  }

  ngOnInit(): void {
    this.title = this.decoration?.verifyPhoneDecoration?.title || 'Verifikasi Nomor';
    this.description = this.decoration?.verifyPhoneDecoration?.description || 'Masukkan nomor handphone anda untuk melanjutkan aplikasi';
    this.buttonText = this.decoration?.verifyPhoneDecoration?.buttonText || 'VERIFIKASI SEKARANG';
    this.nomorInputDecoration = Object.assign({
      labelText: "Nomor Handphone",
      icon: "cellphone"
    }, this.decoration?.verifyPhoneDecoration?.nomorInputDecoration || {});
  }

}
