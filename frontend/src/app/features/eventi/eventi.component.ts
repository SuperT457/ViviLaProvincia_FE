import { Component } from '@angular/core';
import { Eventi } from '../../models/eventi.model';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {
  eventi: Eventi[] = [];

  nuovoEvento: Eventi = {
    id: 0,
    titolo: '',
    data: '',
    luogo: '',
    descrizione: ''
  };

 
}
