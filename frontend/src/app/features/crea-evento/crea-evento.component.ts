import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Utente } from '../../models/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento, EventoCreate } from '../../models/evento.model';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-evento',
  standalone: true,
  templateUrl: './crea-evento.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./crea-evento.component.css']
})
export class CreaEventoComponent{
    
    loggedUser: Utente | null = null;
    nuovoEvento!: EventoCreate;
    categorie: Categoria[] = [];

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
        private eventoService: EventoService,
        private cdr: ChangeDetectorRef,
        private categoriaService: CategoriaService
    ) {}

    ngOnInit() {
        // Implementa la logica per caricare i dettagli dell'evento da modificare
        this.loadCategorie();
    }

    loadCategorie(): void{
        // Implementa la logica per caricare le categorie disponibili

        this.categoriaService.getAllCategorie().subscribe({
            next: (data) => {
                this.categorie = data;
                console.log('Categorie caricate:', data);
            },
            error: (err) => {
                console.error('Errore caricamento categorie:', err);
            }
        });
    }

}