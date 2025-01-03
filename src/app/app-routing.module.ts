import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {AfficherCarteComponent} from "./pokemon/afficherCarte/afficherCarte.component";
import {SignupComponent} from "./signup/signup.component";
import {CreateCollectionComponent} from "./collection/create-collection/create-collection.component";
import {ViewCollectionComponent} from "./collection/view-collection/view-collection.component";

const routes: Routes = [// { path: ``, redirectTo: 'login', pathMatch: 'full'},
    {path: ``, component: AfficherCarteComponent}, {path: 'login', component: LoginComponent}, {
        path: 'signup', component: SignupComponent
    }, {path: "collection/new", component: CreateCollectionComponent}, {
        path: "collection/:id",
        component: ViewCollectionComponent
    }, {path: `**`, component: PageNotFoundComponent}, {path: `carte`, component: AfficherCarteComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
