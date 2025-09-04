import { Utente } from "./user.model";
import { Categoria } from "./categoria.model";

export interface Evento {
  id: number;
  titolo: string;
  descrizione: string;
  luogo: string;
  dataora: Date;  
  costo: number;
  n_posti: number;
  organizzatore: Utente;  // più avanti puoi sostituire con un model Organizzatore
  categoria: Categoria;      // idem, puoi sostituire con model Categoria
  image_url?: String;
}
