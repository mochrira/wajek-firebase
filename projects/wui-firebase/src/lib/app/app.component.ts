import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { filter, map } from 'rxjs/operators';
import { WuiService, MessageService } from '@wajek/wui';
import { Router } from '@angular/router';

@Component({
  selector: 'wui-firebase-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  isLoggedIn = false;
  showLoading = false;

  constructor(
    private authService: WuiFirebaseAuthService,
    private wuiService: WuiService,
    private router: Router,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/landing']);
  }

  ngOnInit() {
    this.messageService.get('wui:loading').subscribe(showLoading => {
      this.showLoading = showLoading;
      this.cd.detectChanges();
    });
    this.authService.isLoggedIn.pipe(filter(isLoggedIn => isLoggedIn !== null && typeof isLoggedIn == "boolean")).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if(!this.isLoggedIn) {
        this.router.navigate(['/landing']);
      }
    });
  }

  async ngAfterViewInit() {
    try {
      this.wuiService.openLoading();
      await this.authService.initialize();
      this.wuiService.closeLoading();
    } catch(e) {
      this.wuiService.closeLoading();
    }
  }

}
