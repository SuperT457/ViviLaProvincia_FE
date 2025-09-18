import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Utente } from '../../models/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-eventi-organizzati',
  standalone: true,
  templateUrl: './eventi-organizzati.component.html',
  imports: [RouterLink, CommonModule],
  styleUrls: ['./eventi-organizzati.component.css']
})
export class EventiOrganizzatiComponent{
    loggedUser: Utente | null = null
    eventiOrganizzati: Evento[] = [];

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private eventoService: EventoService,
        private cdr: ChangeDetectorRef
    ){}
    
    ngOnInit(){
        this.loggedUser = this.sessionService.getLoggedUser();
        this.loadEventi();
    }

    loadEventi(): void{
        console.log("Caricamento eventi organizzati per utente: ", this.loggedUser);
        if(this.loggedUser && this.loggedUser?.id){
            this.eventoService.getEventiPerOrganizzatore(this.loggedUser.id).subscribe({
                next: (eventi) => {
                    console.log('Eventi organizzati caricati:', eventi);
                    this.eventiOrganizzati = eventi;
                    this.cdr.detectChanges(); // Forza il rilevamento delle modifiche
                },
                error: (err) => {
                    console.error('Errore nel caricamento degli eventi organizzati:', err);
                }
            });
        }else{
            alert("Devi essere loggato per visualizzare questa pagina.");
        }
    }
}  