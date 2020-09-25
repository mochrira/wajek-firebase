import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'wui-firebase-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isInit = true;
  logo: string;
  title: string;
  description: string;
  buttonText: string;

  constructor(
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async ngOnInit() {
    this.logo = this.decoration?.landingDecoration?.logo || '';
    this.title = this.decoration?.landingDecoration?.title || 'Smart Application';
    this.description = this.decoration?.landingDecoration?.description || 'Aplikasi berbasis kolaborasi yang efektif untuk usaha/lembaga anda';
    this.buttonText = this.decoration?.landingDecoration?.buttonText || 'MULAI';
  }

}