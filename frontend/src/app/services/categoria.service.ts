import { Injectable } from "@angular/core";
import { Categoria } from "../models/categoria.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriaService{
    private baseUrl: string = 'http://localhost:8080/api/categorie';

    constructor(private http: HttpClient){}

    getAllCategorie(): Observable<Categoria[]>{
        return this.http.get<Categoria[]>(`${this.baseUrl}`);
    }
}