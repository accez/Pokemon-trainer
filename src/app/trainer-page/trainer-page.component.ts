import { Component } from '@angular/core';
import { TrainersService } from '../services/trainers.service'
import { Pokemon } from '../models/pokemon.model';
import { PokemonDetailedPageComponent } from '../pokemon-detailed-page/pokemon-detailed-page.component';


@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss']
})
export class TrainerPageComponent{

  constructor(private readonly trainerService: TrainersService) { }

  pokemonId(pokemon: Pokemon): string {
    let urlArray = pokemon.url.split("/")
    return urlArray[urlArray.length - 2]
  }

  getCurrentUser(){
    let temp = this.trainerService.getCurrentUserFromStorage
    if (temp === null) {
      return [] as Pokemon[]
    } else {
      return temp.pokemon
    }
  }
}
