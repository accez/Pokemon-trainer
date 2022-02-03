import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    private _trainers: Trainer[] = [];
    private _error: string = "";
    

    constructor(private http: HttpClient, ) {
    }

    public fetchTrainers(): void {
        this.http.get<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers")
        .subscribe((trainers: Trainer[]) =>{
            this._trainers = trainers;
        },(error: HttpErrorResponse) =>{
            this._error = error.message;
        })
    }

    public postATrainer(trainer: Trainer) {
        this.http.post<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers",trainer, httpOptions)
        .subscribe((trainer: Trainer[]) =>{
        })
    }

    public trainers(): Trainer[]{
        return this._trainers
    }

    public error() :string{
        return this._error
    }
};