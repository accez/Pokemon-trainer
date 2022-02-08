import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailed } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detailed-page',
  templateUrl: './pokemon-detailed-page.component.html',
  styleUrls: ['./pokemon-detailed-page.component.scss']
})
export class PokemonDetailedPageComponent implements OnInit {

  constructor(
    private readonly pokemonService: PokemonService,
    private route: ActivatedRoute) { }

  /**
   * Init method to make the pokemonService fetch the detaild info of the pokemon with 
   * id set in url params
   */
  ngOnInit(): void {
    const pokemonId = Number(this.route.snapshot.paramMap.get('id'))
    if (pokemonId !== null) {
      this.pokemonService.fetchPokemonDetailed(pokemonId)
    }
  }

  /**
   * Method to get PokemonDetailed from pokemonService
   * @returns PokemonDetailed current in pokemonService or and empty PokemonDetailed object
   */
  getPokemon(): PokemonDetailed {
    const pokemon = this.pokemonService.getDetailedPokemon
    if (pokemon !== undefined)
      return pokemon
    else {
      return {
        name: "",
      } as PokemonDetailed
    }
  }
}
