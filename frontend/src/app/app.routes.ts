import { Routes } from '@angular/router';
import { EventiComponent } from './features/eventi/eventi.component';
import { LoginComponent } from './features/login/login.component';
import { DettaglioEventoComponent} from './features/dettaglio-evento/dettaglio-evento.component';
import { RegisterComponent} from './features/registrazione/registrazione.component';
import { PrenotazioniComponent } from './features/prenotazioni/prenotazioni.component';
import { EventiOrganizzatiComponent } from './features/eventi-organizzati/eventi-organizzati.component';

export const routes: Routes = [
    {path: 'eventi', component: EventiComponent}, //lista eventi
    {path: 'eventi/:id', component: DettaglioEventoComponent }, //dettaglio evento
    {path: '', redirectTo: 'eventi', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'prenotazioni/:userId', component: PrenotazioniComponent },
    {path: 'eventi-organizzati/:organizzatoreId', component: EventiOrganizzatiComponent }
];
