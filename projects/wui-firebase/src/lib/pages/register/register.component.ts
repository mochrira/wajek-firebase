import { Component, OnInit, Inject } from '@angular/core';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WuiService } from '@wajek/wui';
import { Router } from '@angular/router';

@Component({
  selector: 'wui-firebase-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title: string;
  description: string;
  displayNameInputDecoration: any;
  emailInputDecoration: any;
  passwordInputDecoration: any;
  confirmInputDecoration: any;
  buttonText: string;
  beforeGoogleText: string;

  formRegister = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required)
  });

  constructor(
    private wuiService: WuiService,
    private authService: WuiFirebaseAuthService,
    @Inject('wuiFirebaseDecoration') private decoration: any,
    private router: Router
  ) { }

  async submit() {
    if(this.formRegister.invalid) {
      this.wuiService.dialog({title: 'Error', message: 'Periksa kembali isian anda', buttons: ["OK"]})
      return;
    }

    if(this.formRegister.controls['password'].value !== this.formRegister.controls['confirm'].value) {
      this.wuiService.dialog({title: 'Error', message: 'Password dan konfirmasi password tidak sama', buttons: ["OK"]});
      return;
    }

    try {
      this.wuiService.openLoading();
      await this.authService.registerEmail(this.formRegister.controls['email'].value, this.formRegister.controls['password'].value, this.formRegister.controls['displayName'].value);      this.wuiService.closeLoading();
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }
        if(e.error.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/register/undangan']);
        }
        if(e.error.code == 'database/need-upgrade') {
          this.router.navigate(['/upgrade']);
        }
      } else {
        this.wuiService.dialog({ title: 'Error', message: e.message, buttons: ["OK"] });
      }
    }
  }

  ngOnInit(): void {
    this.title = this.decoration?.registerDecoration?.title || 'Daftar';
    this.description = this.decoration?.registerDecoration?.description || 'Isilah formulir dibawah ini untuk mendaftar ke aplikasi';
    this.displayNameInputDecoration = Object.assign({
      labelText: 'Nama Tampilan',
      icon: 'account-edit'
    }, this.decoration?.registerDecoration?.displayNameInputDecoration || {})
    this.emailInputDecoration = Object.assign({
      labelText: 'Email',
      icon: 'at'
    }, this.decoration?.registerDecoration?.emailInputDecoration || {});
    this.passwordInputDecoration = Object.assign({
      labelText: 'Password',
      icon: 'lock-outline'
    }, this.decoration?.registerDecoration?.passwordInputDecoration || {});
    this.confirmInputDecoration = Object.assign({
      labelText: 'Ketik ulang password',
      icon: 'form-textbox-password'
    }, this.decoration?.registerDecoration?.confirmInputDecoration || {});
    this.buttonText = this.decoration?.registerDecoration?.buttonText || 'DAFTAR DENGAN EMAIL';
    this.beforeGoogleText = this.decoration?.registerDecoration?.beforeGoogleText || 'atau tekan tombol dibawah ini untuk daftar menggunakan akun google anda';
  }

}
