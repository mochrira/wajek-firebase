import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { filter, tap, catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthGuardService implements CanActivate {

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      map(isLoggedIn => {
        if((typeof isLoggedIn) !== "boolean") {
          isLoggedIn == false;
        }
        return isLoggedIn;
      }),
      tap(isLoggedIn => {
        if(!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      }
    ));
  }

}
