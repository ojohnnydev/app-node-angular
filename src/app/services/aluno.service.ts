import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = 'http://localhost:3000/alunos';

  constructor(private httpClient: HttpClient) { }

  // Busca todos os alunos
  getAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // Busca aluno por id
  getAlunoById(ID: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(this.url + '/' + ID)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // Salva aluno
  saveAluno(aluno: { DATA_NASCIMENTO: string; CPF: string; DATA_CRIACAO: string; EMAIL: string; NOME: string; SEXO: string; MAIOR_IDADE: string }): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.url, aluno)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // Atualiza aluno
  updateAluno(aluno: { DATA_CRIACAO: string; DATA_ALTERACAO: string; DATA_NASCIMENTO: string; CPF: string; ID: number; EMAIL: string; NOME: string; SEXO: string; MAIOR_IDADE: string }): Observable<Aluno> {
    return this.httpClient.put<Aluno>(this.url + '/' + aluno.ID, aluno)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Deleta aluno
  deleteAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.delete<Aluno>(this.url + '/' + aluno.ID)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
