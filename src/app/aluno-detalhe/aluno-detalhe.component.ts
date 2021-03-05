import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno = {} as Aluno;

  constructor(private route: ActivatedRoute, private alunoService: AlunoService) {}

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
  // Funções auxiliares
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
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
