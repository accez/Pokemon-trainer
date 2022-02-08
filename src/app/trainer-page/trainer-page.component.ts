import { Component } from '@angular/core';
import { TrainersService } from '../services/trainers.service'
import { PageEvent } from '@angular/material/paginator';
import { Pokemon } from '../models/pokemon.model';


@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss']
})
export class TrainerPageComponent{
  pageSize = 10;
  index = 0



  constructor(private readonly trainerService: TrainersService) { }

  pokemonId(pokemon: Pokemon): string {
    let urlArray = pokemon.url.split("/")
    return urlArray[urlArray.length - 2]
  }

  getCurrentUser() {
    let temp =  this.trainerService.getCurrentUserFromStorage
    if (temp === null) {
      return [] as Pokemon[]
    } else {
      return temp.pokemon
    }
  }

  displayPokemon() {
    return this.getCurrentUser().splice(this.index,this.pageSize);
  }

  handelPageChange(event: PageEvent) {
    let nextIndex = event.pageIndex * event.pageSize
    if(this.getCurrentUser() !== null){
      this.index = nextIndex;
      this.pageSize = event.pageSize;
      console.log(this.pageSize)
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