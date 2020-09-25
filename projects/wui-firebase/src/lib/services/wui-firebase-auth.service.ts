import { Injectable, Inject } from '@angular/core';
import { Pengguna } from '../models/pengguna';
import { BehaviorSubject } from 'rxjs';
import { WuiFirebasePenggunaService } from './wui-firebase-pengguna.service';
import { WuiFirebaseUpgradeService } from './wui-firebase-upgrade.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  penggunaAktif: Pengguna;
  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject(null);
  closeListener: any;
  messaging: any;

  constructor(
    private penggunaService: WuiFirebasePenggunaService,
    private upgradeService: WuiFirebaseUpgradeService,
    @Inject('wuiFirebaseConfig') private firebaseConfig: any
  ) { 
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      firebase.initializeApp(this.firebaseConfig);
      this.closeListener = firebase.auth().onAuthStateChanged(async (user) => {
        try {
          resolve(await this.accountInfo());
        } catch(e) {
          reject(e);
        }
        this.closeListener();
      });
    });
  }

  async accountInfo() {
    try {
      if(firebase.auth().currentUser == null) {
        this.isLoggedIn.next(false);
        return false;
      } else {
        this.penggunaAktif = await this.penggunaService.row(firebase.auth().currentUser.uid);
        let needUpgrade = await this.upgradeService.needUpgrade();
        if(needUpgrade) {
          let error = {
            error: {
              code: 'database/need-upgrade'
            }
          };
          this.isLoggedIn.next(error);
          throw error;
        } else {
          this.isLoggedIn.next(true);
          return this.penggunaAktif;
        }
      }
    } catch(e) {
      this.isLoggedIn.next(e);
      throw e;
    }
  }

  async signInEmail(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return await this.accountInfo();
  }

  async registerEmail(email: string, password: string) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return await this.accountInfo();
  }

  async signInGoogle() {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    return await this.accountInfo();
  }

  signOut() {
    return new Promise(async (resolve) => {
      await firebase.auth().signOut();
      this.penggunaAktif = null;
      this.isLoggedIn.next(false);
      resolve(true);
    })
  }

}