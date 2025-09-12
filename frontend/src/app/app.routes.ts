import { Routes } from '@angular/router';
import { EventiComponent } from './features/eventi/eventi.component';
import { LoginComponent } from './features/login/login.component';
import { DettaglioEventoComponent} from './features/dettaglio-evento/dettaglio-evento.component';
import { RegisterComponent} from './features/registrazione/registrazione.component';

export const routes: Routes = [
    {path: 'eventi', loadComponent: () => EventiComponent}, //lista eventi
    {path: 'eventi/:id', component: DettaglioEventoComponent }, //dettaglio evento
    {path: '', redirectTo: 'eventi', pathMatch: 'full'},
    {path: 'login', loadComponent: () => LoginComponent},
    {path: 'register', loadComponent: () => RegisterComponent }
];
