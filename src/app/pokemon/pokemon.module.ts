import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfficherCarteComponent } from './afficherCarte/afficherCarte.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';

// Définition des routes pour le module Pokémon
const pokemonRoutes: Routes = [

];

// @ts-ignore
@NgModule({
    declarations: [
        // Déclaration de tous les composants, directives et pipes
        AfficherCarteComponent,
        BorderCardDirective,
        PokemonTypeColorPipe,
        LoaderComponent
    ],
    imports: [
        // Importation des modules nécessaires
        CommonModule,
        FormsModule,
        RouterModule.forChild(pokemonRoutes)
    ],
    providers: [
        // Déclaration des services nécessaires
        PokemonService
    ],
    exports: [
        // Exports des composants que vous souhaitez rendre accessibles depuis d'autres modules
        AfficherCarteComponent,
    ]
})
export class PokemonModule { }
