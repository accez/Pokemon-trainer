import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private readonly trainersService:TrainersService, private route: Router) { }
  private _userInput: string = '';

  ngOnInit(): void {
    this.trainersService.fetchTrainers()
    this.doesTrainerExistInDatabase()
  }

  public onChangeGetUserName(event: Event) {
    const target = event.target as HTMLInputElement
    this._userInput = target.value 
  }

  public getUserInput():string {
    return this._userInput
  }

  public addTrainer () {
    const uniq = new Date().getTime();
    const newTrainer: Trainer =  {id: uniq, username:this.getUserInput(), pokemon: []}
    const existingTrainer = this.doesTrainerExistInDatabase()
    
    if(existingTrainer){
      return
    } else {
      this.storeTrainerInLocalStorage(JSON.stringify(newTrainer))
      this.trainersService.postATrainer(newTrainer)
      this.route.navigate(["/catalogue"])
    }
  }

  public submit(event:Event){
    event.preventDefault();
    this.addTrainer();
   }

   doesTrainerExistInDatabase():boolean {
    let boolean = false
    for (const trainer of this.trainers) {
      if(this.getUserInput() === trainer.username){
        let trainerObject = {
          id: trainer.id,
          username: trainer.username,
          pokemon: trainer.pokemon
        }
        this.storeTrainerInLocalStorage(JSON.stringify(trainerObject))
        boolean = true
      }
    }
    this.route.navigate(["/catalogue"])
    return boolean
   }



  get trainers() : Trainer[] {
    return this.trainersService.trainers();
  }

   public storeTrainerInLocalStorage(userObject:string){
    localStorage.setItem("trainer", userObject);
   }
}
