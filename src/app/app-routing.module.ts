import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/guards/auth-redirect.guard';

const routes: Routes = [
    { path: 'login', redirectTo: 'login', pathMatch: 'full' },

    // { path: 'consultations/:id', loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule), canActivate: [AuthGuard] },

    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
