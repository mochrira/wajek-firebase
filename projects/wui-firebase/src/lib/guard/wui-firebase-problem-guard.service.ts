import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { tap, catchError, map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseProblemGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if((typeof isLoggedIn) !== "boolean") {
          
        }
        return isLoggedIn;
      })
    );
  }

}


@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseVerifyGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      map(isLoggedIn => {
        if(typeof isLoggedIn !== 'boolean' && isLoggedIn.error.code == 'firebase-auth/unverified-number') {
          return true
        }
        return false;
      }),
      tap(hasProblem => {
        if(!hasProblem) {
          this.router.navigate(['/home'])
        }
      })
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAksesGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      map(isLoggedIn => {
        if(typeof isLoggedIn !== 'boolean' && isLoggedIn.error.code == 'firebase-auth/invalid-akses') {
          return true
        }
        return false;
      }),
      tap(hasProblem => {
        if(!hasProblem) {
            this.router.navigate(['/home'])
        }
      })
    );
  }

}


@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseUpgradeGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      map(isLoggedIn => {
        if(typeof isLoggedIn !== 'boolean' && isLoggedIn.error.code == 'database/need-upgrade') {
          return true
        }
        return false;
      }),
      tap(hasProblem => {
        if(!hasProblem) {
            this.router.navigate(['/home'])
        }
      })
    );
  }

}