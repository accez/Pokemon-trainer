import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";

const httpOptions = {
    headers: new HttpHeaders({
        'X-API-Key':"X9dHGcSU9kuwKyxz2/p+TA==",
      'Content-Type':  'application/json',
    })
  };

@Injectable({
    providedIn: "root"
})

export class TrainersService{
    private trainers: Trainer[] = [];
    private error: string = "";
    
    private baseUrl = "https://spa-lb-experis-assignment.herokuapp.com/trainers"

    constructor(private http: HttpClient, ) {
    }

    public fetchTrainers(): void {
        this.http.get<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers")
        .subscribe((trainers: Trainer[]) =>{
            this.trainers = trainers;
        },(error: HttpErrorResponse) =>{
            this.error = error.message;
        })
    }

    public postATrainer(trainer: Trainer) {
        this.http.post<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers",trainer, httpOptions)
        .subscribe((trainer: Trainer[]) =>{
        })
    }

    public addPokemonToTrainer(trainer:Trainer):void{
        this.http.patch<Trainer>(`${this.baseUrl}/${trainer.id}`,trainer,httpOptions)
        .subscribe({
            next: (response) => {
              // TODO man borde sen kanske sätta state här?
              console.log(response)
            }, error: (error: Error) => { console.log(error.message) }
          })

    }

};