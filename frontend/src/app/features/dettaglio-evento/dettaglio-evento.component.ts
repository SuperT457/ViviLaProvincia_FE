import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';
//import { CurrencyPipe } from '@angular/common';
//import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Utente } from '../../models/user.model';
import { SessionService } from '../../services/session.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-evento',
  templateUrl: './dettaglio-evento.component.html',
  imports: [RouterLink, CommonModule],
  styleUrls: ['./dettaglio-evento.component.css']
})
export class DettaglioEventoComponent implements OnInit {
  evento!: Evento;
  loading: boolean = true;
  loggedUser: Utente | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvento(this.route.snapshot.params['id']);
    this.loggedUser = this.sessionService.getLoggedUser();
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
    if (this.evento && this.loggedUser?.id) {
      this.eventoService.acquistaBiglietto(this.loggedUser.id,this.evento.id).subscribe({
        next: (data) => {
          console.log('Biglietto acquistato:', data);
          alert('Biglietto acquistato con successo!');
          this.router.navigate(['/prenotazioni',this.loggedUser?.id]);
        },
        error: (err) => {
          console.error('Errore acquisto biglietto:', err);
          //alert('Errore durante l\'acquisto del biglietto. Riprova.');
          alert(err.error.message);
        }
      });
    }
  }

    getImageUrl(evento: Evento): string{
    return `http://localhost:8080${evento.image_url}`;
  }
}
