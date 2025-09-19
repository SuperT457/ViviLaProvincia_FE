import { Injectable } from "@angular/core";
import { Utente } from "../models/user.model";
import { UtenteService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class SessionService{
    dummyUser: Utente = {
        username: 'jwebw',
        mail: 'mail@mail',
        ruolo: 'u'
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

    aggiungiPunti(user: Utente): void{
        if(user?.punti) user.punti += 10;

        this.setLoggedUser(user);
    }
}