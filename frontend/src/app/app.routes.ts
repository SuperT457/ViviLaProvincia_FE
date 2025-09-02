import { Routes } from '@angular/router';
import { EventiComponent } from './features/eventi/eventi.component';
import { LoginComponent } from './features/login/login.component';
import { DettaglioEventoComponent} from './features/dettaglio-evento/dettaglio-evento.component';

export const routes: Routes = [
    {path: 'eventi', component: EventiComponent}, //lista eventi
    {path: 'eventi/:id', component: DettaglioEventoComponent }, //dettaglio evento
    {path: '', redirectTo: 'eventi', pathMatch: 'full'},
    {path: 'login', loadComponent: () => LoginComponent},
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: '', redirectTo: '/login', pathMatch: 'full' },
];
