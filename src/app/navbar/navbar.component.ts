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

  /**
   * Method to get current users username
   * @returns current user username or undefined
   */
  getCurrentUser():string | undefined {
    return this.trainerService.getCurrentUserFromStorage?.username
  }
  
  
  logOut(){
    localStorage.clear()
  }

}
