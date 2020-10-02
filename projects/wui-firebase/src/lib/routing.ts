import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterLembagaComponent } from './pages/register-lembaga/register-lembaga.component';
import { JoinComponent } from './pages/join/join.component';
import { WuiFirebaseNologinGuardService } from './guard/wui-firebase-nologin-guard.service';
import { WuiFirebaseAksesGuardService, WuiFirebaseUpgradeGuardService } from './guard/wui-firebase-problem-guard.service';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';

export var WuiFirebaseRouting: Routes = [{
    path: 'landing', component: LandingComponent, canActivate: [WuiFirebaseNologinGuardService]
}, {
    path: 'login', component: LoginComponent, canActivate: [WuiFirebaseNologinGuardService]
}, {
    path: 'register', component: RegisterComponent, canActivate: [WuiFirebaseNologinGuardService]
}, {
    path: 'join', component: JoinComponent, canActivate: [WuiFirebaseAksesGuardService]
}, {
    path: 'register/lembaga', component: RegisterLembagaComponent, canActivate: [WuiFirebaseAksesGuardService]
}, {
    path: 'upgrade', component: UpgradeComponent, canActivate: [WuiFirebaseUpgradeGuardService]
}];