import { Injectable } from '@angular/core';
import { InMemoryDbService} from "angular-in-memory-web-api";
import {POKEMONS} from "./pokemon/mock-pokemon-list";
import {Pokemon} from "./pokemon/pokemon";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    const pokemons = POKEMONS;
    return { pokemons };
  }
}
