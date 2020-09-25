import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { WuiService } from '@wajek/wui';
import { Router } from '@angular/router';

@Component({
  selector: 'wui-firebase-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  title: string;
  description: string;
  emailInputDecoration: any;
  passwordInputDecoration: any;
  buttonText: string;
  googleDecoration: any;
  registerText: string;

  constructor(
    private authService: WuiFirebaseAuthService,
    private wuiService: WuiService,
    private router: Router,
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async signInGoogle() {
    try {
      this.wuiService.openLoading();
      await this.authService.signInGoogle();
      this.wuiService.closeLoading();
      this.router.navigate(['/home']);
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }else if(e.error.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/register/undangan']);
        }else if(e.error.code == 'database/need-upgrade') {
          this.router.navigate(['/upgrade']);
        }
      } else {
        this.wuiService.dialog({ title: 'Error', message: e.message, buttons: ["OK"] });
      }
    }
  }

  async signInEmail() {
    if(this.formLogin.invalid) {
      this.wuiService.snackbar({
        label: 'Periksa kembali isian anda'
      });
    }
    
    try {
      this.wuiService.openLoading();
      await this.authService.signInEmail(
        this.formLogin.controls['email'].value, 
        this.formLogin.controls['password'].value
      );
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
        if(e.error.code == 'database/need-upgrade') {
          this.router.navigate(['/upgrade']);
        }
      } else {
        this.wuiService.dialog({title: "Error", message: e.message, buttons: ["OK"]});
      }
    }
  }

  ngOnInit(): void {
    this.title = this.decoration?.loginDecoration?.title || 'Masuk';
    this.description = this.decoration?.loginDecoration?.description || 'Masukkan email dan password untuk melanjutkan aplikasi';
    this.emailInputDecoration = Object.assign({
      labelText: 'Email',
      icon: 'at'
    }, this.decoration?.loginDecoration?.emailInputDecoration || {});
    this.passwordInputDecoration = Object.assign({
      labelText: 'Password',
      icon: 'lock-outline'
    }, this.decoration?.loginDecoration?.passwordInputDecoration || {});
    this.googleDecoration = Object.assign({
      beforeText: 'Atau tekan tombol dibawah ini untuk masuk menggunakan akun google anda',
      afterText: 'Tidak punya akun google?'
    }, this.decoration?.loginDecoration?.googleDecoration || {});
    this.buttonText = this.decoration?.loginDecoration?.buttonText || 'MASUK DENGAN EMAIL';
    this.registerText = this.decoration?.loginDecoration?.registerText || 'Daftar dengan email';
  }

}
