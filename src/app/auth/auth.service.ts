import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor () {}

    isLoggedIn(): boolean{
        let boolean = false
        let trainer =  localStorage.getItem('trainer');
        if(trainer){
            boolean = true
        }
       return boolean
    }
}