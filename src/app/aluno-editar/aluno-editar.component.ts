import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno-editar',
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.css']
})
export class AlunoEditarComponent implements OnInit {

  aluno = {} as Aluno;

  constructor(private route: ActivatedRoute, private alunoService: AlunoService, private rotas: Router) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros['id']) {
        let alunoId = parametros['id'];
        this.getAlunosById(alunoId);
      }
    });
  }

  // Chama o serviço para buscar o aluno pelo id
  getAlunosById(ID: number) {
    this.alunoService.getAlunoById(ID).subscribe((aluno: Aluno) => {
      this.aluno = aluno[0];
    });
  }
  // Atualiza aluno
  updateAluno(form: NgForm) {

    let data_alteracao = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    data_alteracao = this.dateBanco(data_alteracao);

    const horas = new Date();
    data_alteracao += ' ' + horas.getHours() + ':' + horas.getMinutes() + ':' + horas.getSeconds();

    let dadosAluno = {
      ID: form.form.value.ID,
      NOME: form.form.value.NOME,
      CPF: form.form.value.CPF.replace('.', '').replace('.', '').replace('-', ''),
      DATA_NASCIMENTO: this.dateBanco(form.form.value.DATA_NASCIMENTO),
      SEXO: this.generoBanco(form.form.value.SEXO),
      EMAIL: form.form.value.EMAIL,
      MAIOR_IDADE: this.aluno.MAIOR_IDADE,
      DATA_CRIACAO: this.aluno.DATA_CRIACAO,
      DATA_ALTERACAO: data_alteracao
    };
    this.alunoService.updateAluno(dadosAluno).subscribe(() => {
      this.aluno = dadosAluno;
    });
    setTimeout(() => this.rotas.navigate(['/alunos/alunoEditado']), 500);
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
  exibeGenero(SEXO: string) {

    let genero = '';

    switch (SEXO) {
      case 'M':
        genero = 'Masculino';
        break;
      case 'F':
        genero = 'Feminino';
        break;
      default:
        genero = 'Outros';
        break;
    }
    return genero;
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
