import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';
//import { CurrencyPipe } from '@angular/common';
//import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dettaglio-evento',
  templateUrl: './dettaglio-evento.component.html',
  imports: [CommonModule],
  styleUrls: ['./dettaglio-evento.component.css']
})
export class DettaglioEventoComponent implements OnInit {
  evento!: Evento;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvento(this.route.snapshot.params['id']);
  }

  loadEvento(id: number): void {
    if (id) {
      this.eventoService.getEventoById(id).subscribe({
        next: (data) => {
          console.log('Evento caricato:', data);
          this.evento = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore caricamento evento:', err);
          this.loading = false;
        }
      });
    }
  }

  acquistaBiglietto(): void {
    alert('Funzionalità di acquisto biglietto non implementata.');
  }

    getImageUrl(evento: Evento): string{
    return `http://localhost:8080${evento.image_url}`;
  }
}