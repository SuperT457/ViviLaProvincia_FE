import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Utente } from './models/user.model';
import { SessionService } from './services/session.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  protected title = 'frontend';
  loggedUser!: Utente | null;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.updateUser();
    console.log(this.loggedUser);
    if(this.loggedUser){
      this.router.navigate(['/eventi']);
      console.log("Utente loggato");
    }else{
      this.router.navigate(['/login']);
      console.log("utente NON LOGGATO");
    }
  }

  updateUser(){
    this.loggedUser = this.sessionService.getLoggedUser();
  }

  logout(): void{ 
    this.sessionService.clearLoggedUser();
  }
} 