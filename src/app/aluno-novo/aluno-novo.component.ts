import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno-novo',
  templateUrl: './aluno-novo.component.html',
  styleUrls: ['./aluno-novo.component.css']
})
export class AlunoNovoComponent implements OnInit {

  aluno: {
    DATA_NASCIMENTO: string;
    CPF: any;
    DATA_CRIACAO: string;
    EMAIL: any;
    NOME: any;
    SEXO: string;
    MAIOR_IDADE: string
  } = {} as Aluno;

  constructor(private alunoService: AlunoService, private rotas: Router) {}

  ngOnInit(): void {
  }

  // Salva aluno
  saveAluno (form: NgForm) {

    let data_criacao = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    data_criacao = this.dateBanco(data_criacao);

    const horas = new Date();
    data_criacao += ' ' + horas.getHours() + ':' + horas.getMinutes() + ':' + horas.getSeconds();

    const cpf = form.form.value.CPF.replace('.', '').replace('.', '').replace('-', '');

    const dadosAluno = {
      NOME: form.form.value.NOME,
      CPF: cpf,
      DATA_NASCIMENTO: this.dateBanco(form.form.value.DATA_NASCIMENTO),
      SEXO: this.generoBanco(form.form.value.SEXO),
      EMAIL: form.form.value.EMAIL,
      MAIOR_IDADE: this.aluno.MAIOR_IDADE,
      DATA_CRIACAO: data_criacao
    };

    this.alunoService.saveAluno(dadosAluno).subscribe((aluno: Aluno) => {
      const response = aluno['response'];

      if (response === 'true') {
        setTimeout(() => this.rotas.navigate(['/alunos/alunoJaCadastrado']), 500);
      } else if (response === 'sucesso') {
        this.aluno = dadosAluno;
        setTimeout(() => this.rotas.navigate(['/alunos/alunoCadastrado']), 500);
      }
    });
  }
  // Funções auxiliares
  verificaMaiorIdade(DATA_NASCIMENTO: string) {
    let data_nascimento = new Date(Date.parse(this.dateBanco(DATA_NASCIMENTO)));
    const ano = new Date().getFullYear();
    const diferenca = ano - data_nascimento.getFullYear();
    let maior_idade = '';

    if (diferenca >= 18) {
      maior_idade = 'sim';
    } else {
      maior_idade = 'não';
    }

    this.aluno.MAIOR_IDADE = maior_idade;
  }
  generoBanco(SEXO: string) {

    let genero = '';

    switch (SEXO) {
      case 'Masculino':
        genero = 'M';
        break;
      case 'Feminino':
        genero = 'F';
        break;
      default:
        genero = 'O';
        break;
    }
    return genero;
  }
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  dateBanco(str: string) {
    return str.split('/').reverse().join('-');
  }
}
