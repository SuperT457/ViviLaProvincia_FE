import { Evento } from "./evento.model";
import { Utente } from "./user.model";

export interface Prenotazione {
    id: number,
    dataOra: Date,
    utente: Utente,
    evento: Evento
}

export interface newPrenotazione{
    utente_id: number,
    evento_id: number
}