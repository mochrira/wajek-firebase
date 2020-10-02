import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WuiModule } from '@wajek/wui';
import { WuiFirebaseModule } from '@wajek/firebase';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PenggunaComponent } from './pages/pengguna/pengguna.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PenggunaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WuiModule.forRoot(),
    WuiFirebaseModule.forRoot({
      apiKey: "AIzaSyBanfw8_I3wdihK9Yjb9mOu7sJdsXW166c",
      authDomain: "framework-testing-d0cd2.firebaseapp.com",
      databaseURL: "https://framework-testing-d0cd2.firebaseio.com",
      projectId: "framework-testing-d0cd2",
      storageBucket: "framework-testing-d0cd2.appspot.com",
      messagingSenderId: "1013931040355",
      appId: "1:1013931040355:web:24b5b4bd0662b847c66256",
      measurementId: "G-ZC8KL7BR8P"
    }, { })
  ],
  providers: [{
    provide: 'apiURL',
    useValue: 'http://selvi-framework.local/'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
