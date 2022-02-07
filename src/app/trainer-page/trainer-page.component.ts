import { Component } from '@angular/core';
import { TrainersService } from '../services/trainers.service'
import { Pokemon } from '../models/pokemon.model';


@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss']
})
export class TrainerPageComponent {

  constructor(private readonly trainerService: TrainersService) { }

  pokemonId(pokemon: Pokemon): string {
    let urlArray = pokemon.url.split("/")
    return urlArray[urlArray.length - 2]
  }

  getCurrentUser() {
    let temp = this.trainerService.getCurrentUserFromStorage
    if (temp === null) {
      return [] as Pokemon[]
    } else {
      return temp.pokemon
    }
  }

  removePokemon(pokemonToRemove: Pokemon) {
    console.log(pokemonToRemove)
    let trainer = this.trainerService.getCurrentUserFromStorage

    if (trainer !== null) {
      for (const pokemon of trainer.pokemon) {
        if(pokemon.name === pokemonToRemove.name){
          pokemon.isDeleted = true;
          console.log(trainer)
          this.trainerService.updateTrainer(trainer)
          return
        }
      }
    }
  }
}
