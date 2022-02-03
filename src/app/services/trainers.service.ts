import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";

@Injectable({
    providedIn: "root"
})

export class TrainersService{
    private trainers: Trainer[] = [];
    private error: string = "";

    constructor(private readonly http: HttpClient) {
    }

    public fetchTrainers(): void {
        this.http.get<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers")
        .subscribe((trainers: Trainer[]) =>{
            this.trainers = trainers;
        },(error: HttpErrorResponse) =>{
            this.error = error.message;
        })
    }
};