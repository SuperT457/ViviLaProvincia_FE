import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Prenotazione } from "../models/Prenotazione";

@Injectable({ providedIn: 'root' })
export class PrenotazioneService{
    private prenotazioneUrl: string = 'http://localhost:8080/api/prenotazioni';

    constructor(private http: HttpClient){}

    getPrenotazioniByUtenteId(utenteId: number): Observable<Prenotazione[]>{
        return this.http.get<Prenotazione[]>(`${this.prenotazioneUrl}/utente/${utenteId}`);
    }
}