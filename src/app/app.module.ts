import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importation des modules spécifiques
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module'; // Module Pokémon
import { LoginComponent } from './login/login.component'; // Composant pour la connexion

// @ts-ignore
@NgModule({
  declarations: [
    // Déclaration des composants utilisés dans ce module
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    // Importation des modules nécessaires
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PokemonModule, // Importation du module Pokémon
    AppRoutingModule, // Configuration des routes de l'application
  ],
  providers: [],
  bootstrap: [AppComponent], // Composant racine
})
export class AppModule {}