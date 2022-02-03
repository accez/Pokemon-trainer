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
  private userInput: string = '';

  ngOnInit(): void {
    this.trainersService.fetchTrainers()
  }

  public onChangeGetUserName(event: Event) {
    const target = event.target as HTMLInputElement
    this.userInput = target.value 
  }

  public getUserInput():string {
    return this.userInput
  }

  public addTrainer () {
    const uniq = new Date().getTime();
    const newTrainer: Trainer =  {id: uniq, username:this.getUserInput(), pokemon: []}
    this.trainersService.postATrainer(newTrainer)
  }

  public submit(event:Event){
    event.preventDefault();
    this.addTrainer();
   }
}
