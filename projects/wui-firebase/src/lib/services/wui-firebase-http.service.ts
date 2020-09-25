import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async get(url, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await firebase.auth().currentUser.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return await this.httpClient.get(url, options).toPromise();
  }

  async post(url, data = {}, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await firebase.auth().currentUser.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.post(url, data, options).toPromise();
  }

  async patch(url, data = {}, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await firebase.auth().currentUser.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.patch(url, data, options).toPromise();
  }

  async delete(url, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await firebase.auth().currentUser.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.delete(url, options).toPromise();
  }

}
