import { Injectable } from "@angular/core";
import { Utente } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UtenteService{
    private baseUrl: string = 'http://localhost:8080/api/utenti';

    constructor(private http: HttpClient){}

    login(username:string, password:string): Observable<Utente>{
	    return this.http.post<Utente>(`${this.baseUrl}/login`, {username,password});
    }
    register(username:string, password:string, email: string): Observable<Utente>{
	    return this.http.post<Utente>(`${this.baseUrl}/register`, {username,password, email});
    }
}