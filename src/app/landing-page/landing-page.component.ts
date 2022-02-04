import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private readonly trainersService:TrainersService) { }
  private _userInput: string = '';

  ngOnInit(): void {
    this.trainersService.fetchTrainers()
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
    const existingTrainer = this.doesTrainerExistInDatabase(JSON.stringify(newTrainer))
    
    if(existingTrainer){
      return
    } else {
      this.storeTrainerInLocalStorage(JSON.stringify(newTrainer))
      this.trainersService.postATrainer(newTrainer)
    }
  }

  public submit(event:Event){
    event.preventDefault();
    this.addTrainer();
   }

   doesTrainerExistInDatabase(user:string):boolean {
    let boolean = false
    for (const trainer of this.trainers) {
      if(this.getUserInput() === trainer.username){
        this.storeTrainerInLocalStorage(user)
        boolean = true
      }
    }
    return boolean
   }

  get trainers() : Trainer[] {
    return this.trainersService.trainers();
  }

   public storeTrainerInLocalStorage(userObject:string){
    localStorage.setItem("trainer", userObject);
   }
}
