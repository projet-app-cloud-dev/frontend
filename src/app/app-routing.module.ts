import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {AfficherCarteComponent} from "./pokemon/afficherCarte/afficherCarte.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [// { path: ``, redirectTo: 'login', pathMatch: 'full'},
    {path: ``, component: AfficherCarteComponent}, {path: 'login', component: LoginComponent}, {
        path: 'signup',
        component: SignupComponent
    }, {path: `**`, component: PageNotFoundComponent}, {path: `carte`, component: AfficherCarteComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
