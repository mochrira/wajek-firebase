import { Component, OnInit, Inject } from '@angular/core';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WuiService } from '@wajek/wui';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WuiFirebaseAksesService } from '../../services/wui-firebase-akses.service';

@Component({
  selector: 'wui-firebase-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  waitAcceptance = false;

  title: string;
  description: string;
  kodeInputDecoration: any;
  buttonText: string;
  beforeRegisterText: string;
  registerText: string;

  formVerify = new FormGroup({
    joinCode: new FormControl('', Validators.required)
  });

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router,
    private wuiService: WuiService,
    private joinService: WuiFirebaseAksesService,
    private activatedRoute: ActivatedRoute,
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async submit() {
    if(this.formVerify.invalid) {
      this.wuiService.dialog({title: 'Error', message: 'Periksa kembali isian anda', buttons: ["OK"]});
      return;
    }

    try {
      this.wuiService.openLoading();
      await this.joinService.insert({joinCode: this.formVerify.controls['joinCode'].value});
      this.wuiService.closeLoading();
      this.router.navigate(['/join'], {
        queryParams: {
          waitAcceptance: true
        }
      })
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }
        if(e.error.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/join']);
        }
        if(e.error.code == 'firebase-auth/invalid-tipe-akses') {
          this.router.navigate(['/join'], {
            queryParams: {
              waitAcceptance: true
            }
          });
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
    this.title = this.decoration?.joinDecoration?.title || 'Bergabung';
    this.description = this.decoration?.joinDecoration?.description || 'Masukkan kode undangan yang anda dapatkan dari pemilik/pengelola lembaga';
    this.kodeInputDecoration = Object.assign({
      labelText: "Kode Undangan",
      icon: "asterisk"
    }, this.decoration?.joinDecoration?.kodeInputDecoration || {});
    this.buttonText = this.decoration?.joinDecoration?.buttonText || 'BERGABUNG SEKARANG';
    this.beforeRegisterText = this.decoration?.joinDecoration?.beforeRegisterText || 'Saya adalah pemilik usaha';
    this.registerText = this.decoration?.joinDecoration?.registerText || 'Daftarkan usaha anda';
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.waitAcceptance = queryParams['waitAcceptance'];
    });
  }

}
