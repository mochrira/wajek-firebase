import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WuiFirebaseLembagaService } from '../../services/wui-firebase-lembaga.service';
import { WuiService } from '@wajek/wui';
import { Lembaga } from '../../models/lembaga';
import { Router } from '@angular/router';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';

@Component({
  selector: 'wui-firebase-register-lembaga',
  templateUrl: './register-lembaga.component.html',
  styleUrls: ['./register-lembaga.component.scss']
})
export class RegisterLembagaComponent implements OnInit {

  title: string;
  description: string;
  namaInputDecoration: any;
  alamatInputDecoration: any;
  kotaInputDecoration: any;
  buttonText: string;

  formLembaga = new FormGroup({
    nmLembaga: new FormControl('', Validators.required),
    alamat: new FormControl('', Validators.required),
    kota: new FormControl('', Validators.required)
  });

  constructor(
    private wuiService: WuiService,
    private lembagaService: WuiFirebaseLembagaService,
    private authservice: WuiFirebaseAuthService,
    private router: Router,
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async submit() {
    if(this.formLembaga.invalid) {
      this.wuiService.dialog({
        title: 'Error',
        message: 'Periksa kembali isian anda',
        buttons: ["OK"]
      });
      return;
    }

    try {
      this.wuiService.openLoading();
      await this.lembagaService.insert(Lembaga.fromJson(this.formLembaga.value));
      await this.authservice.accountInfo();
      this.wuiService.closeLoading();
      this.router.navigate(['/home']);
    } catch(e) {
      this.wuiService.closeLoading();
      this.wuiService.dialog({title: 'Error', message: e.message, buttons: ["OK"]});
    }
  }

  ngOnInit(): void {
    this.title = this.decoration?.registerLembagaDecoration?.title || 'Daftar Usaha';
    this.description = this.decoration?.registerLembagaDecoration?.description || 'Isilah formulir dibawah ini untuk mendaftarkan usaha anda';
    this.namaInputDecoration = Object.assign({
      labelText: "Nama Usaha",
      icon: "store"
    },this.decoration?.registerLembagaDecoration?.namaInputDecoration || {});
    this.alamatInputDecoration = Object.assign({
      labelText: "Alamat",
      icon: "map-check"
    },this.decoration?.registerLembagaDecoration?.alamatInputDecoration || {});
    this.kotaInputDecoration = Object.assign({
      labelText: "Kota",
      icon: "map-marker"
    },this.decoration?.registerLembagaDecoration?.kotaInputDecoration || {});
    this.buttonText = this.decoration?.registerLembagaDecoration?.buttonText || "DAFTARKAN USAHA SAYA";
  }

}
