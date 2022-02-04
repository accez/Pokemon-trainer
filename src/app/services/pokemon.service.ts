import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonDetailed, PokemonListFromApi } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonApiBaseUrl = "https://pokeapi.co/api/v2/pokemon"
  pokemonList: Pokemon[] = [];
  pokemon: PokemonDetailed | undefined;

  constructor(private http: HttpClient,) { }

  public fetchPokemonListWithOffset(offset: Number,nrToFetch:number) {
    this.http.get<PokemonListFromApi>(`${this.pokemonApiBaseUrl}?offset=${offset}&limit=${nrToFetch}`)
      .subscribe({
        next: (response) => {
          this.pokemonList = response.results
        }, error: (error: Error) => { console.log(error.message) }
      })
  }


  public fetchPokemonDetailed(id: number) {
    this.http.get<PokemonDetailed>(`${this.pokemonApiBaseUrl}/${id}/`)
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
