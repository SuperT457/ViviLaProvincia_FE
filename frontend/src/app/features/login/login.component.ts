import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // aggiungi questa importazione
import { UtenteService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { SessionService } from '../../services/session.service';
import { Utente } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // aggiungi ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedUser: Utente | null = null

  constructor(private fb: FormBuilder, 
    private utenteService: UtenteService, 
    private appComponent: AppComponent, 
    private sessionService: SessionService,
    private router: Router) {
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Qui puoi gestire il login, chiamare un servizio, ecc.
      console.log('Username:', username);
      console.log('Password:', password);
      
      this.utenteService.login(username,password).subscribe({
        next: (utente) => {
          console.log('Login successful', utente);
          this.sessionService.setLoggedUser(utente);
          this.loggedUser = this.sessionService.getLoggedUser();
          this.appComponent.updateUser();
          this.router.navigate(['/']);
        },
        error: (err) => { console.error('Login failed',err);}
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
