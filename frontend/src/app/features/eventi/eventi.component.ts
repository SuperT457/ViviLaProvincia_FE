import { Component } from '@angular/core';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {
  eventi: Evento[] = [];

  nuovoEvento: Evento = {
    id: 0,
    titolo: '',
    dataOra: new Date() ,
    luogo: '',
    descrizione: '',
    costo: 0,
    n_posti: 0,
    organizzatore: '',
    categoria:'',
  };

 
}
