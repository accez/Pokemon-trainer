import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../services/trainers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly trainerService:TrainersService) { }

  ngOnInit(): void {
  }

  getCurrentUser(){
    return this.trainerService.getCurrentUserFromStorage?.username
  }
  
}
