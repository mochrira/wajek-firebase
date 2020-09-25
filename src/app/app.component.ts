import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WuiFirebaseAuthService } from '@wajek/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLoggedIn = false;

  constructor(
    private firebaseAuthService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  async signOut() {
    await this.firebaseAuthService.signOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.firebaseAuthService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

}
