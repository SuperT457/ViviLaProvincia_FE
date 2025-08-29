import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-dettaglio-evento',
  templateUrl: './dettaglio-evento.component.html',
  styleUrls: ['./dettaglio-evento.component.css']
})
export class DettaglioEventoComponent implements OnInit {
  evento?: Evento;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.eventoService.getEventoById(id).subscribe({
        next: (data) => {
          this.evento = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore caricamento evento:', err);
          this.loading = false;
        }
      });
    }
  }

  acquistaBiglietto() {
    if (!this.evento) return;

    this.eventoService.acquistaBiglietto(this.evento.id).subscribe({
      next: () => alert(`✅ Biglietto per: "${this.evento?.titolo}" acquistato!`),
      error: (err) => {
        console.error('Errore acquisto:', err);
        alert('❌ Errore nell’acquisto, riprova.');
      }
    });
  }
}