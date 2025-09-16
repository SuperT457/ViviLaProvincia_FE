import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../../models/Prenotazione';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dettaglio-evento',
  templateUrl: './dettaglio-evento.component.html',
  imports: [RouterLink, CommonModule],
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent{
    Prenotazioni: Prenotazione[] = [];

    ngOnInit(): void {
        
    }
}