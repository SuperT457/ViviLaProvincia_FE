import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // aggiungi questa importazione
import { UtenteService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule], // aggiungi ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private utenteService: UtenteService, private appComponent: AppComponent) {
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
        next: (utente) => {console.log('Login successful', utente);},
        error: (err) => { console.error('Login failed',err);}
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
