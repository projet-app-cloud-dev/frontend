import { Component , OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-afficherCarte',
  templateUrl: './afficherCarte.component.html',
  styles: [
  ]
})
export class AfficherCarteComponent implements OnInit{
  //pokemonList: Pokemon[];

  constructor(
      private router: Router,
      private pokemonService: PokemonService
  ) {}
  ngOnInit(){
  }
}
