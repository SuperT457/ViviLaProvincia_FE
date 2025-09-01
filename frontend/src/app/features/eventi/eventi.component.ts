import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventi',
  imports: [RouterLink, CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {
  eventi: Evento[] = [];
  loading: boolean = true;

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    // Recupera eventi dal backend
    this.eventoService.getEventi().subscribe({
      next: (data) => {
        this.eventi = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore caricamento eventi', err);
        this.loading = false;
      }
    });

    // Per test senza backend, puoi usare dati fittizi
    // this.eventi = [
    //   { id: 1, titolo: 'Concerto Demo', dataOra: new Date(), luogo: 'Arena', costo: 15, n_posti: 100, organizzatore: 'Band Demo', categoria: 'Musica', descrizione: 'Descrizione demo' },
    //   { id: 2, titolo: 'Concerto Demo 2', dataOra: new Date(), luogo: 'Palazzetto', costo: 20, n_posti: 80, organizzatore: 'Band 2', categoria: 'Rock', descrizione: 'Descrizione demo 2' }
    // ];
  }
}