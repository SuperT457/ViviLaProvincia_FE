import { Injectable } from "@angular/core";
import { Utente } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class SessionService{
    dummyUser: Utente = {
        username: 'jwebw',
        mail: 'mail@mail',
        ruolo: 'utente'
    }

    getLoggedUser() : Utente | null{
        const raw = localStorage.getItem('utente');
        return raw ? JSON.parse(raw) as Utente : null;
    }

    setLoggedUser(user:Utente): void{
        localStorage.setItem('utente',JSON.stringify(user));
    }

    clearLoggedUser(): void{
        localStorage.removeItem('utente');
    }
}