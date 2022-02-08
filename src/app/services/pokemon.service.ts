import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonDetailed, PokemonListFromApi } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonApiBaseUrl = "https://pokeapi.co/api/v2/pokemon"
  _numberPokemons:number = 0;
  pokemonList: Pokemon[] = [];
  pokemon: PokemonDetailed | undefined;

  constructor(private http: HttpClient,) { }

  /**
   * Api call to get pokemons from pokemon api
   * @param offset the next index to fetch (called offset in pokemon api)
   * @param nrToFetch number of pokemons o fetch
   */
  public fetchPokemonListWithOffset(offset: Number, nrToFetch: number) {
    this.http.get<PokemonListFromApi>(`${this.pokemonApiBaseUrl}?offset=${offset}&limit=${nrToFetch}`)
      .subscribe({
        next: (response) => {
          this._numberPokemons = response.count
          this.pokemonList = response.results
        }, error: (error: Error) => { console.log(error.message) }
      })
  }

  /**
   * Api call to get the detailed info of a pokemon
   * @param id of the pokemon to get detailed page on
   */
  public fetchPokemonDetailed(id: number) {
    this.http.get<PokemonDetailed>(`${this.pokemonApiBaseUrl}/${id}/`)
      .subscribe({
        next: (response) => {
          this.pokemon = response
        }, error: (error: Error) => { console.log(error.message) }
      })
  }

  get numberPokemons(){
    return this._numberPokemons
  }
  get getPokemonList(): Pokemon[] {
    return this.pokemonList;
  }
  get getDetailedPokemon():PokemonDetailed | undefined{
    return this.pokemon
  }
  get getDetailedPokemonUrl():string{
    if(this.pokemon !== undefined){
      return this.pokemon.sprites.front_default
    }
    return "NOT FOUND"
  }

}
