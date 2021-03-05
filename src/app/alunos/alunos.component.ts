import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[];
  public mensagem: string;

  constructor(private alunoService: AlunoService, private route: ActivatedRoute, private rotas: Router) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros['msg']) {
        const msg = parametros['msg'];
        this.getAlunos(msg);
      } else {
        this.getAlunos('');
      }
    });
  }
  // Chama o serviço para buscar todos os alunos
  getAlunos(mensagem: string) {
    this.alunoService.getAlunos().subscribe((alunos: Aluno[]) => {
      if (alunos.length !== 0) {
        this.alunos = alunos;
        if (mensagem) {
          this.mensagem = mensagem;
        }
      }
    });
  }
  // Deleta aluno
  deleteAluno(aluno: Aluno) {
    this.alunoService.deleteAluno(aluno).subscribe(() => {
      setTimeout(() => { this.rotas.navigate(['/alunos/alunoExcluido']); }, 500);
    });
  }
}
