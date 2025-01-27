import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/guards/auth-redirect.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'patients', pathMatch: 'full' },

    { path: 'consultations/:id', loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule), canActivate: [AuthGuard] },
    { path: 'patients', loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule), canActivate: [AuthGuard] },
    { path: 'specialiste', loadChildren: () => import('./modules/specialiste/specialiste.module').then(m => m.SpecialisteModule), canActivate: [AuthGuard] },
    { path: 'teleexpertise', loadChildren: () => import('./modules/tele-expertise/tele-expertise.module').then(m => m.TeleExpertiseModule), canActivate: [AuthGuard] },
    { path: 'teleconsultation', loadChildren: () => import('./modules/teleconsultation/teleconsultation.module').then(m => m.TeleconsultationModule), canActivate : [AuthGuard] },
    { path: 'groupes', loadChildren: () => import('./modules/groupe/groupe.module').then(m => m.GroupeModule), canActivate: [AuthGuard] },
    { path: 'departements', loadChildren: () => import('./modules/departement/departement.module').then(m => m.DepartementModule), canActivate: [AuthGuard] },
    { path: 'collaborateurs', loadChildren: () => import('./modules/collaborateur/collaborateur.module').then(m => m.CollaborateurModule), canActivate: [AuthGuard] },
    { path: 'parametrage', loadChildren: () => import('./modules/parametrage/parametrage.module').then(m => m.ParametrageModule), canActivate: [AuthGuard] },
    { path: 'rendez-vous', loadChildren: () => import('./modules/rendez-vous/rendez-vous.module').then(m => m.RendezVousModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthRedirectGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
