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
  templateUrl: './edit-evento.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./edit-evento.component.css']
})
export class EditEventoComponent{

    eventoId: number | null = null;
    evento: Evento | null = null;
    loggedUser: Utente | null = null;
    nuovoEvento!: EventoCreate;
    categorie: Categoria[] = [];
    selectedFile: File | null = null;

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
        this.loadEvento();
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

    onFileSelected(event: any){
        this.selectedFile = event.target.files[0];
    }

    upload(): void{
        if(this.selectedFile === null || this.evento === null) { return; }
        
        const formData = new FormData();
        formData.append('file',this.selectedFile);
        this.eventoService.uploadImage(formData).subscribe({
            next: (data) => {
                console.log("Immagine salvata in ",data);
                if(this.nuovoEvento) this.nuovoEvento.image_url = String(data);
                this.inviaEvento();
            },
            error: (err) => {
                console.error("Errore upload: ", err.error);
            }
        })

    }

    cancellaEvento(): void {
        console.log("Cancellazione evento iniziata");
        if(this.eventoId){
            this.eventoService.eliminaEvento(this.eventoId).subscribe({
                next: (data) => {
                    console.log('Evento eliminato con successo! Info:', data);
                    alert("Evento eliminato con successo!");
                    this.router.navigate(['/eventi-organizzati']);
                },
                error: (err) => {
                    console.error('Errore eliminazione evento:', err);
                    alert("Errore durante l'eliminazione dell'evento. Riprova.");
                }
            })
        }else{
            alert("ID evento non valido.");
            this.router.navigate(['/eventi-organizzati']);
        }
    }

    loadEvento(): void{
        this.loggedUser = this.sessionService.getLoggedUser();
        if(!this.loggedUser){
            alert("Devi essere loggato per modificare un evento.");
            this.router.navigate(['/login']);
            return;
        }

        if(this.loggedUser.ruolo !== 'o'){
            alert("Devi essere un organizzatore per modificare un evento.");
            this.router.navigate(['/eventi']);
            return;
        }

        this.eventoId = Number(this.route.snapshot.params['id']);
        if(this.eventoId){
            this.eventoService.getEventoById(this.eventoId).subscribe({
                next: (data) => {
                    console.log('Evento caricato per modifica:', data);
                    this.evento = data;
                    this.nuovoEvento = {
                        titolo: data.titolo,
                        descrizione: data.descrizione,
                        luogo: data.luogo,
                        dataora: new Date(data.dataora),
                        costo: data.costo,
                        n_posti: data.n_posti,
                        idCategoria: data.categoria?.id || 1
                    };
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error('Errore caricamento evento per modifica:', err);
                }
            });
        }else{
            alert("ID evento non valido.");
            this.router.navigate(['/eventi-organizzati']);
        }
    }

    modificaEvento(): void{
        if(this.selectedFile)
            this.upload();
        else{
            this.nuovoEvento.image_url = this.evento?.image_url;
            this.inviaEvento();
        }
    }

    inviaEvento(): void{
	    console.log("Nuovo EVENTO STRINGIFY: ",JSON.stringify(this.nuovoEvento));
        console.log("evento NON stirngify: ", this.nuovoEvento);
        if(this.eventoId){
            this.eventoService.aggiornaEvento(this.eventoId,this.nuovoEvento).subscribe({
                next: (data) => {
                    console.log('Evento modificato con successo! Info:', data);
                    alert("Evento modificato con successo!");
                    this.router.navigate(['/eventi-organizzati']);
                },
                error: (err) => {
                    console.error('Errore modifica evento:', err);
                    alert("Errore durante la modifica dell'evento. Riprova.");
                }
            })
        }else{
            alert("ID evento non valido.");
            this.router.navigate(['/eventi-organizzati']);
        }
    }
}
