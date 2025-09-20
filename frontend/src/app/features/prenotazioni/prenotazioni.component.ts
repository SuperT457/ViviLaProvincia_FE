import { Component } from '@angular/core';
import { Prenotazione } from '../../models/Prenotazione';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SessionService } from '../../services/session.service';
import { Utente } from '../../models/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  imports: [RouterLink, CommonModule],
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent{
  PrenotazioniFuture: Prenotazione[] = [];
  PrenotazioniPassate: Prenotazione[] = [];
  loggedUser: Utente | null = null; 

  constructor(
    private prenotazioneService: PrenotazioneService,
    private router: Router,
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loggedUser = this.sessionService.getLoggedUser();
    if(!this.loggedUser) { this.router.navigate(['/login']); return; } // Redirige al login se non c'è un utente loggato
    this.loadPrenotazioni();  
  } 
  
  loadPrenotazioni(): void {
    if(this.loggedUser?.id){
      this.prenotazioneService.getPrenotazioniByUtenteId(this.loggedUser.id).subscribe({
        next: (data) => {
          console.log('Prenotazioni caricate:', data);
          this.PrenotazioniFuture = data.filter(p => new Date(p.evento.dataora) >= new Date());
          this.PrenotazioniPassate = data.filter(p => new Date(p.evento.dataora) < new Date());
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore caricamento prenotazioni:', err);
        }
      });
    }
  }

  eliminaPrenotazione(prenotazioneId: number): void {
    if(confirm('Sei sicuro di voler cancellare questa prenotazione?')) {
      this.prenotazioneService.cancellaPrenotazione(prenotazioneId).subscribe({
        next: () => {
          console.log('Prenotazione cancellata con successo');
          this.PrenotazioniFuture = this.PrenotazioniFuture.filter(p => p.id !== prenotazioneId);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore durante la cancellazione della prenotazione:', err);
        }
      });
    }
  }

  getImageUrl(image_url?: String): string{
      return `http://localhost:8080/api/eventi/images/${image_url}`;
  }
}