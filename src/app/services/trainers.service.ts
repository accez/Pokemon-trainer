import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";

const httpOptions = {
    headers: new HttpHeaders({
        'X-API-Key': "X9dHGcSU9kuwKyxz2/p+TA==",
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: "root"
})

export class TrainersService {
    private _trainers: Trainer[] = [];
    private _error: string = "";

    private baseUrl = "https://spa-lb-experis-assignment.herokuapp.com/trainers"

    constructor(private http: HttpClient,) {
    }

    public fetchTrainers(): void {
        this.http.get<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers")
            .subscribe((trainers: Trainer[]) => {
                this._trainers = trainers;
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            })
    }

    public postATrainer(trainer: Trainer) {
        this.http.post<Trainer[]>("https://spa-lb-experis-assignment.herokuapp.com/trainers", trainer, httpOptions)
            .subscribe((trainer: Trainer[]) => {
            })
    }

    public addPokemonToTrainer(pokemonToAdd: Pokemon): void {
        let trainer = this.getCurrentUserFromStorage
        if (trainer !== null) {
            if (!trainer.pokemon.find(pokemon => { return pokemon.name === pokemonToAdd.name })) {
                trainer.pokemon.push(pokemonToAdd)
                this.http.patch<Trainer>(`${this.baseUrl}/${trainer.id}`, trainer, httpOptions)
                    .subscribe({
                        next: (response) => {
                            localStorage.setItem("trainer", JSON.stringify(response));
                        }, error: (error: Error) => { console.log(error.message) }
                    })
            }
        }
    }

    public updateTrainer(trainer: Trainer): void {
        // TODO get trainer from local storgae
        this.http.patch<Trainer>(`${this.baseUrl}/${trainer.id}`, trainer, httpOptions)
            .subscribe({
                next: (response) => {
                    // TODO man borde sen kanske sätta state här?
                    localStorage.setItem("trainer", JSON.stringify(response));
                    console.log(response)
                }, error: (error: Error) => { console.log(error.message) }
            })

    }

    get getCurrentUserFromStorage(): Trainer | null {
        let trainer = localStorage.getItem("trainer")
        if (trainer !== null) {
            return JSON.parse(trainer)
        }
        return null
    }

    public addPokemonToTrainerInLocalStorage(id: number, username: string, pokemon: string[]) {
        const trainer = {
            id: id,
            username: username,
            pokemon: pokemon
        }
        localStorage.setItem("trainer", JSON.stringify(trainer))
    }

    public trainers(): Trainer[] {
        return this._trainers
    }

    public error(): string {
        return this._error
    }
};