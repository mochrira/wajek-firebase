import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  penggunaAktif: any = {};
  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject(null);
  closeListener: any;
  messaging: any;

  constructor(
    private httpService: WuiFirebaseHttpService,
    @Inject('apiURL') private apiURL: string,
    @Inject('wuiFirebaseConfig') private firebaseConfig: any,
    private router: Router
  ) { 
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      firebase.initializeApp(this.firebaseConfig);
      this.closeListener = firebase.auth().onAuthStateChanged(async (user) => {
        try {
          this.penggunaAktif = await this.accountInfo();
          this.closeListener();
          resolve(true);
        } catch(e) {
          reject(e);
        }
      });
    });
  }

  async accountInfo() {
    if(firebase.auth().currentUser == null) {
      this.isLoggedIn.next(false);
      return;
    }

    try {
      this.penggunaAktif = await this.httpService.get(this.apiURL + 'auth');
      this.isLoggedIn.next(true);
      return this.penggunaAktif;
    } catch(e) {
      if(e.error?.code == 'firebase-auth/invalid-akses') {
        this.router.navigate(['/join']);
      }
      if(e.error?.code == 'firebase-auth/invalid-tipe-akses') {
        this.router.navigate(['/join'], {
          queryParams: {
            waitAcceptance: true
          }
        });
      }
      if(e.error?.code == 'db/need-upgrade') {
        this.router.navigate(['/upgrade']);
      }
      this.isLoggedIn.next(e);
      throw e;
    }
  }

  async signInEmail(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return await this.accountInfo();
  }

  async registerEmail(email: string, password: string, displayName: string) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({
      displayName: displayName
    });
    return await this.accountInfo();
  }

  async signInGoogle() {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    return await this.accountInfo();
  }

  async signOut() {
    await firebase.auth().signOut();
    this.penggunaAktif = null;
    this.isLoggedIn.next(false);
    return true;
  }

}