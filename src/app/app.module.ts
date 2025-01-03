import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PokemonModule} from "./pokemon/pokemon.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CreateCollectionComponent} from './collection/create-collection/create-collection.component';
import {
    AddNewCardDialog,
    EditCardCountDialog,
    ViewCollectionComponent
} from './collection/view-collection/view-collection.component';
import {NgOptimizedImage} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {ApplicationinsightsAngularpluginErrorService} from "@microsoft/applicationinsights-angularplugin-js";


@NgModule({
    declarations: [AppComponent, PageNotFoundComponent, LoginComponent, SignupComponent, CreateCollectionComponent, ViewCollectionComponent, AddNewCardDialog, EditCardCountDialog],
    imports: [BrowserModule, FormsModule, HttpClientModule, PokemonModule, AppRoutingModule, NgOptimizedImage, MatDialogModule, MatCardModule, MatInputModule, MatIconModule, MatButtonModule, MatGridListModule, ReactiveFormsModule],
    providers: [{
        provide: ErrorHandler, useClass: ApplicationinsightsAngularpluginErrorService,
    },],
    bootstrap: [AppComponent]
})
export class AppModule {
}
