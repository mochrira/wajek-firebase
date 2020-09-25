import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WuiFirebaseAuthGuardService, WuiFirebaseRouting } from '@wajek/firebase';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [...WuiFirebaseRouting, {
  path: 'home', component: HomeComponent, canActivate: [WuiFirebaseAuthGuardService]
}, {
  path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
