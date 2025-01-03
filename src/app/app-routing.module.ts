import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AfficherCarteComponent } from './pokemon/afficherCarte/afficherCarte.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut vers la page de connexion
  { path: 'login', component: LoginComponent }, // Route pour la connexion
  { path: 'carte', component: AfficherCarteComponent }, // Route pour afficher les cartes
  { path: '**', component: PageNotFoundComponent } // Gestion des routes non trouvées
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
