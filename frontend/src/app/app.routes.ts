import { Routes } from '@angular/router';
import { EventiComponent } from './features/eventi/eventi.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {path: 'eventi', component: EventiComponent},
    {path: '', redirectTo: 'eventi', pathMatch: 'full'},
    {path: 'login', loadComponent: () => LoginComponent},
];
