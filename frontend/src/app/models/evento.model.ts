export interface Evento {
  id: number;
  titolo: string;
  descrizione: string;
  luogo: string;
  dataOra: Date;  
  costo: number;
  n_posti: number;
  organizzatore: string;  // più avanti puoi sostituire con un model Organizzatore
  categoria: string;      // idem, puoi sostituire con model Categoria
}
