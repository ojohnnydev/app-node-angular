import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoEditarComponent } from './aluno-editar.component';

describe('AlunoEditarComponent', () => {
  let component: AlunoEditarComponent;
  let fixture: ComponentFixture<AlunoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
