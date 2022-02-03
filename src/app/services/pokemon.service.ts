import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonDetailed, PokemonListFromApi } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonList: Pokemon[] = [];
  pokemon: PokemonDetailed | undefined;

  constructor(private http: HttpClient,) { }


  public fetchPokemonListWithOffset(offset: Number) {
    this.http.get<PokemonListFromApi>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
      .subscribe({
        next: (response) => {
          this.pokemonList = response.results
        }, error: (error: Error) => { console.log(error.message) }
      })
  }


  public fetchPokemonDetailed(id: number) {
    this.http.get<PokemonDetailed>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .subscribe({
        next: (response) => {
          this.pokemon = response
        }, error: (error: Error) => { console.log(error.message) }
      })
  }

  get getPokemonList(): Pokemon[] {
    return this.pokemonList;
  }

}
