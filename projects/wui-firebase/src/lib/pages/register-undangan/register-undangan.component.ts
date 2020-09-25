import { Component, OnInit, Inject } from '@angular/core';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { Router } from '@angular/router';
import { WuiService } from '@wajek/wui';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WuiFirebaseUndanganService } from '../../services/wui-firebase-undangan.service';

@Component({
  selector: 'wui-firebase-register-undangan',
  templateUrl: './register-undangan.component.html',
  styleUrls: ['./register-undangan.component.scss']
})
export class RegisterUndanganComponent implements OnInit {

  title: string;
  description: string;
  kodeInputDecoration: any;
  buttonText: string;
  beforeRegisterText: string;
  registerText: string;

  formVerify = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router,
    private wuiService: WuiService,
    private undanganService: WuiFirebaseUndanganService,
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async submit() {
    if(this.formVerify.invalid) {
      this.wuiService.dialog({title: 'Error', message: 'Periksa kembali isian anda', buttons: ["OK"]});
      return;
    }

    try {
      this.wuiService.openLoading();
      let pengguna = await this.undanganService.verify(this.formVerify.controls['code'].value);
      console.log(pengguna);
      this.wuiService.closeLoading();
      this.router.navigate(['/home']);
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }
        if(e.error.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/register/undangan']);
        }
      } else {
        this.wuiService.dialog({title: "Error", message: e.message, buttons: ["OK"]});
      }
    }
  }

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

  ngOnInit(): void {
    this.title = this.decoration?.registerUndanganDecoration?.title || 'Bergabung';
    this.description = this.decoration?.registerUndanganDecoration?.description || 'Masukkan kode undangan yang anda dapatkan dari pemilik/pengelola lembaga';
    this.kodeInputDecoration = Object.assign({
      labelText: "Kode Undangan",
      icon: "asterisk"
    }, this.decoration?.registerUndanganDecoration?.kodeInputDecoration || {});
    this.buttonText = this.decoration?.registerUndanganDecoration?.buttonText || 'BERGABUNG SEKARANG';
    this.beforeRegisterText = this.decoration?.registerUndanganDecoration?.beforeRegisterText || 'Saya adalah pemilik usaha';
    this.registerText = this.decoration?.registerUndanganDecoration?.registerText || 'Daftarkan usaha anda';
  }

}
