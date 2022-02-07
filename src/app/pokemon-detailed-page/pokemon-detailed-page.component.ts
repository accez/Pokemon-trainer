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

  // private pokemonId:number;

  constructor(
    private readonly pokemonService: PokemonService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const pokemonId = Number(this.route.snapshot.paramMap.get('id'))
    if (pokemonId !== null) {
      this.pokemonService.fetchPokemonDetailed(pokemonId)
    }
  }

  getPokemon() {
    const pokemon = this.pokemonService.getDetailedPokemon
    if (pokemon !== undefined)
      return pokemon
    else{
      return {
        name:"",
      }as PokemonDetailed
    }
  }
}
