import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/guards/auth-redirect.guard';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // { path: 'consultations/:id', loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule), canActivate: [AuthGuard] },

    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
