import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { FormsModule } from '@angular/forms';
import { Utente } from '../../models/user.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-eventi',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, CommonModule, FormsModule],
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {
  eventiPassati: Evento[] = [];
  eventiFuturi: Evento[] = [];
  loading: boolean = true;
  categorie: Categoria[] = [];
  selectedCategoriaId?: number = 1;
  filteredEventi: Evento[] = [];
  stringSearch: boolean = false;
  ricerca: string = '';
  loggedUser: Utente | null = null;

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private categoriaService: CategoriaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.sessionService.getLoggedUser();
    console.log(this.selectedCategoriaId);
    this.loadEventi();
    this.loadCategorie();
  }

  loadEventi(): void{
    this.eventoService.getEventi().subscribe({
      next: (data) => {
        this.eventiFuturi = data.filter(evento => new Date(evento.dataora) >= new Date());
        this.eventiPassati = data.filter(evento => new Date(evento.dataora) < new Date());
        console.log("Ho trovato questi eventi futuri: ");
        console.log("Ho trovato questi eventi: ");
        this.filterByCategoria();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore caricamento eventi', err);
        this.loading = false;
      }
    });
  }

  loadCategorie(): void{
    this.categoriaService.getAllCategorie().subscribe({
      next: (data) => {
        this.categorie = data;
        console.log("Ho trovato queste categorie: ");
        for (let c of this.categorie) {
          console.log(c);
        }
        //this.selectedCategoriaId = this.categorie[0].id;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore caricamento categorie', err);
      }
    });
  }

  filterByCategoria(): void {
    if (this.selectedCategoriaId === null) {
      this.filteredEventi = this.eventiFuturi;
    }else {
      this.filteredEventi = this.eventiFuturi.filter(evento => evento.categoria.id === this.selectedCategoriaId);
    }
    this.cdr.detectChanges();
  }

  selectCategoria(categoriaId?: number): void {
    this.selectedCategoriaId = categoriaId;
    this.filterByCategoria();
  }

  getImageUrl(evento: Evento): string{
    return `http://localhost:8080${evento.image_url}`;
  }

  clearSearch(): void {
    this.stringSearch = false;
    this.ricerca = '';
    this.filterByCategoria();
    this.cdr.detectChanges();
  }

  searchEvent(): void {
    this.stringSearch = true;

    console.log("Sto cercando: " + this.ricerca);

    const ricercaLower = this.ricerca.toLowerCase();
    this.filteredEventi = this.eventiFuturi.filter(evento => 
      evento.titolo.toLowerCase().includes(ricercaLower) ||
      evento.descrizione.toLowerCase().includes(ricercaLower)
    );
    console.log("Eventi filtrati: ",this.filteredEventi);
    this.cdr.detectChanges();
  }
}