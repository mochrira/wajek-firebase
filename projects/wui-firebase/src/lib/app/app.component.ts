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
    this.authService.isLoggedIn
      .pipe(
        filter(isLoggedIn => isLoggedIn !== null),
        map(isLoggedIn => {
          if((typeof isLoggedIn) !== "boolean") {
            return false;
          }
          return isLoggedIn;
        })
      )
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      });

      this.messageService.get('wui:loading').subscribe(showLoading => {
        this.showLoading = showLoading;
        this.cd.detectChanges();
      });
  }

  async ngAfterViewInit() {
    try {
      this.wuiService.openLoading();
      let isLoggedIn = await this.authService.initialize();
      if(isLoggedIn == false) {
        this.router.navigate(['/landing']);
      }
      this.wuiService.closeLoading();
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error) {
        if(e.error?.code == 'firebase-auth/unverified-number') {
          this.router.navigate(['/verify/phone']);
        }
        if(e.error?.code == 'firebase-auth/invalid-akses') {
          this.router.navigate(['/register/undangan']);
        }
        if(e.error?.code == 'database/need-upgrade') {
          this.router.navigate(['/upgrade']);
        }
      } else {
        this.wuiService.dialog({
          title: 'Error',
          message: e.message,
          buttons: ["OK"]
        });
      }
    }
  }

}
