import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../entities/pessoa';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  message(msg: String): void{
    this.snack.open(`${msg}` , `OK`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  apagar(id: any): Observable<void>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }
 
  findAll() : Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.baseUrl);
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa>{
    const url = `${this.baseUrl}/${pessoa.id}`
    return this.http.put<Pessoa>(url, pessoa);
  }

  cadastrar(Pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(this.baseUrl, Pessoa);
  }
}
