import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { filter, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseNologinGuardService implements CanActivate {

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      map(isLoggedIn => {
        if((typeof isLoggedIn) !== "boolean") {
          isLoggedIn = false;
        }
        return !isLoggedIn;
      }),
      tap(notLoggedIn => {
        if(!notLoggedIn) {
          this.router.navigate(['/home']);
        }
      }
    ));
  }

}
