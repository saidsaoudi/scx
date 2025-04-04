import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/guards/auth-redirect.guard';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // { path: 'consultations/:id', loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule), canActivate: [AuthGuard] },

    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'tms', loadChildren: () => import('./modules/tms/tms.module').then(m => m.TmsModule) },
    { path: 'alerts-management', loadChildren: () => import('./modules/alerts-management/alerts-management.module').then(m => m.AlertsManagementModule) },
    { path: 'approvisionnement', loadChildren: () => import('./modules/approvisionnement/approvisionnement.module').then(m => m.ApprovisionnementModule) },
    { path: 'planification-aps', loadChildren: () => import('./modules/planification-aps/planification-aps.module').then(m => m.PlanificationApsModule) },
    {path : 'inventaire', loadChildren: () => import('./modules/inventaire/inventaire.module').then(m => m.InventaireModule)},
    {path : 'reception', loadChildren: () => import('./modules/mouvement/mouvement.module').then(m => m.MouvementModule)},
    {path : 'sortie', loadChildren: () => import('./modules/mouvement/mouvement.module').then(m => m.MouvementModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
