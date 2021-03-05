import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos/alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoNovoComponent } from './aluno-novo/aluno-novo.component';
import { AlunoEditarComponent } from './aluno-editar/aluno-editar.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  {
    path: 'alunos',
    component: AlunosComponent,
    data: { title: 'Lista de Alunos' }
  },
  {
    path: 'alunos/:msg',
    component: AlunosComponent,
    data: { title: 'Lista de Alunos' }
  },
  {
    path: 'aluno-detalhe/:id',
    component: AlunoDetalheComponent,
    data: { title: 'Informações do Aluno' }
  },
  {
    path: 'aluno-novo',
    component: AlunoNovoComponent,
    data: { title: 'Adicionar Aluno' }
  },
  {
    path: 'aluno-editar/:id',
    component: AlunoEditarComponent,
    data: { title: 'Editar o Aluno' }
  },
  {
    path: 'contato',
    component: ContatoComponent,
    data: { title: 'Adicionar Aluno' }
  },
  { path: '',
    redirectTo: '/alunos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
