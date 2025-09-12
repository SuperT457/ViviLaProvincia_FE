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

@Component({
  selector: 'app-eventi',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {
  eventi: Evento[] = [];
  loading: boolean = true;
  categorie: Categoria[] = [];

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.loadEventi();
    this.loadCategorie();
  }

  loadEventi(): void{
    this.eventoService.getEventi().subscribe({
      next: (data) => {
        this.eventi = data;
        console.log("Ho trovato questi eventi: ");
        for (let e of this.eventi) {
          console.log(e);
        }
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore caricamento categorie', err);
      }
    });
  }

  getImageUrl(evento: Evento): string{
    return `http://localhost:8080${evento.image_url}`;
  }
}