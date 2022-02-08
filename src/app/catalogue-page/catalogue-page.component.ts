import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
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
  fetchPokemonList(idToFetch: number, nrToFetch: number) {
    this.pokemonService.fetchPokemonListWithOffset(idToFetch, nrToFetch)
  }

  pokemonList(): Pokemon[] {
    return this.pokemonService.getPokemonList
  }
  numberOfPages() {
    return Math.ceil( this.pokemonService._numberPokemons / this.pageSize)
  }


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
   * Help render methods 
   */

  /**
   * 
   * @param pokemon 
   * @returns 
   */
  pokemonId(pokemon: Pokemon): string {
    let urlArray = pokemon.url.split("/")
    return urlArray[urlArray.length - 2]
  }

  handelPageChange(event: PageEvent) {
    let nextIndex = event.pageIndex * event.pageSize
    this.pageSize = event.pageSize
    this.fetchPokemonList(nextIndex, event.pageSize)
  }

  trainerHavePokemon(pokemon: Pokemon) {
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

  getCurrentUserList(): Pokemon[] {
    let temp = this.trainerService.getCurrentUserFromStorage
    if (temp === null) {
      return [] as Pokemon[]
    } else {
      return temp.pokemon
    }
  }
}
