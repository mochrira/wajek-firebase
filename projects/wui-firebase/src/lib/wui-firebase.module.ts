import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';
import { WuiModule } from '@wajek/wui';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { JoinComponent } from './pages/join/join.component';
import { RegisterLembagaComponent } from './pages/register-lembaga/register-lembaga.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    WuiModule.forRoot()
  ],
  declarations: [
    LandingComponent,
    LoginComponent,
    AppComponent,
    JoinComponent,
    RegisterLembagaComponent,
    RegisterComponent,
    UpgradeComponent
  ],
  exports: [
    AppComponent
  ]
})
export class WuiFirebaseModule {

  static forRoot(firebaseConfig: any, decoration: any): ModuleWithProviders<WuiFirebaseModule> {
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseHttpService,
        {
          provide: 'wuiFirebaseConfig',
          useValue: firebaseConfig
        },
        {
          provide: 'wuiFirebaseDecoration', 
          useValue: decoration
        }
      ]
    };
  }

}