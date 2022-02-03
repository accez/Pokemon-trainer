import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../services/trainers.service';

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

  public onChangeGetUserName(event: any) {
    this.userInput = event.target.value
  }

  public getUserInput() {
    return this.userInput
  }

  public submit(e:any){
    e.preventDefault();
   }
}
