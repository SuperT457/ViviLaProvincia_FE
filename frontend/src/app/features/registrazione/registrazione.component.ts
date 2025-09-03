
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
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-registrazione',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegisterComponent {
  RegisterForm: FormGroup;
  registerUser: Utente | null = null
  registerError: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, 
    private utenteService: UtenteService, 
    private appComponent: AppComponent, 
    private sessionService: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    
    this.RegisterForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  get password() {
    return this.RegisterForm.get('password')!;
  }

  get username() {
    return this.RegisterForm.get('username')!;
  }
  get email() {
    return this.RegisterForm.get('email')!;
  }

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePassword(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  goToRegister(event: Event) {
  event.preventDefault(); // evita il comportamento predefinito del link
  this.router.navigate(['/login']);
}

  onSubmit() {
    if (this.RegisterForm.valid) {
      const { username, password ,email} = this.RegisterForm.value;
      // Qui puoi gestire il login, chiamare un servizio, ecc.
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
      
      
      this.utenteService.login(username,password).subscribe({
        next: (utente) => {
          console.log('Registrazione corretta', utente);
          this.sessionService.setLoggedUser(utente);
          this.registerUser = this.sessionService.getLoggedUser();
          this.appComponent.updateUser();
          this.router.navigate(['/']);
        },
        error: (err) => { 
          console.error('Problemi con la registrazione',err);
          this.registerError = 'Registro fallito. Controlla le credenziali.';
          this.cdr.detectChanges(); // Forza il rilevamento delle modifiche
        }
      })
    } else {
      this.RegisterForm.markAllAsTouched();
    }
  }

}



