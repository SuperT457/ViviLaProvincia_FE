import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Evento, EventoCreate } from "../models/evento.model";
import { newPrenotazione } from "../models/Prenotazione";

@Injectable({ providedIn: 'root' })
export class EventoService {
  private baseUrl: string = 'http://localhost:8080/api/eventi';
  private prenotazioneUrl: string = 'http://localhost:8080/api/prenotazioni';

  constructor(private http: HttpClient) {}

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }

  getEventoById(id: number): Observable<Evento> {
    
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }

  creaEvento(evento: EventoCreate, organizzatoreId?: number): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseUrl}/${organizzatoreId}`, evento);
  }

  aggiornaEvento(id: number, evento: EventoCreate): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseUrl}/${id}`, evento);
  }

  eliminaEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEventiPerOrganizzatore(organizzatoreId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/organizzatore/${organizzatoreId}`);
  }

  uploadImage(formData: FormData): Observable<String>{
    return this.http.post<String>('http://localhost:8080/api/eventi/upload-img', formData, {responseType: 'text' as 'json'} );
  }

  acquistaBiglietto(utenteId: number,eventoId: number): Observable<void> {
    console.log(`Acquisto biglietto per utente ${utenteId} e evento ${eventoId}`);

    const prenotazione: newPrenotazione = {utente_id: utenteId, evento_id: eventoId};
    
    return this.http.post<void>(`${this.prenotazioneUrl}`, prenotazione);
  }
}
