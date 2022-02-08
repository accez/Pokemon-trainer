import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { TrainersService } from '../services/trainers.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.scss']
})
export class CataloguePageComponent implements OnInit {

  pageSize = 10

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainersService) {

  }

  ngOnInit(): void {
    this.fetchPokemonList(0, this.pageSize);
  }
  /**
   * Method to call the pokeminService and make it fetch pokemons
   * @param idToFetch first index in the pokemon api to fetch
   * @param nrToFetch number of pokemons to fetch
   */
  fetchPokemonList(idToFetch: number, nrToFetch: number) {
    this.pokemonService.fetchPokemonListWithOffset(idToFetch, nrToFetch)
  }
  /**
   * Method to get the fetch pokemon list from pokemonService
   * @returns list ok Pokemons to render
   */
  pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList
  }
  /**
   * Help method to calculate number of pages to show in paginator
   * @returns rounded up int
   */
  numberOfPages():NumberInput {
    return this.pokemonService._numberPokemons
  }

  /**
   * Method to handel the "cathing" of pokemons, will check if pokemon exist in user object and 
   * if is deleted will change isDeleted to false i.e. readd pokemon. Else it will add it for the first time
   * and them update the api with new user object.
   * @param pokemonToAdd clicked pokemon object from html
   */
  catchPokemon(pokemonToAdd: Pokemon) {
    let trainer = this.trainerService.getCurrentUserFromStorage
    let added = false
    if (trainer !== null) {
      for (const pokemon of trainer.pokemon) {
        if (pokemon.name === pokemonToAdd.name) {
          pokemon.isDeleted = false;
          this.trainerService.updateTrainer(trainer)
          added = true
        }
      }
      if (!added) {
        trainer.pokemon.push({ name: pokemonToAdd.name, url: pokemonToAdd.url, isDeleted: false })
        this.trainerService.updateTrainer(trainer)
      }
    }
  }


  /**
   * Help render method to get the pokemon id from the url of object to be able to fetch
   * pokemon image from pokemon api 
   * @param pokemon pokemon object to get id from 
   * @returns id of the pokemon from pokemon api
   */
  pokemonId(pokemon: Pokemon): string {
    let urlArray = pokemon.url.split("/")
    return urlArray[urlArray.length - 2]
  }

  /**
   * Method to handel changes on the paginator witch handles what pokemons to show
   * @param event paginator event 
   */
  handelPageChange(event: PageEvent) {
    let nextIndex = event.pageIndex * event.pageSize
    this.pageSize = event.pageSize
    this.fetchPokemonList(nextIndex, event.pageSize)
  }

  /**
   * Method to determent if the user have catched the pokemon if so if it is deleted or not. 
   * @param pokemon 
   * @returns 
   */
  trainerHavePokemon(pokemon: Pokemon):Boolean {
    const trainersPokemon = this.trainerService.getCurrentUserFromStorage?.pokemon
    if (trainersPokemon !== undefined) {
      for (let i = 0; i < trainersPokemon.length; i++) {
        if (trainersPokemon[i].name === pokemon.name) {
          return !trainersPokemon[i].isDeleted
        }
      }
    }
    return false
  }

  // /**
  //  * 
  //  * @returns 
  //  */
  // getCurrentUserList(): Pokemon[] {
  //   let temp = this.trainerService.getCurrentUserFromStorage
  //   if (temp === null) {
  //     return [] as Pokemon[]
  //   } else {
  //     return temp.pokemon
  //   }
  // }
}
