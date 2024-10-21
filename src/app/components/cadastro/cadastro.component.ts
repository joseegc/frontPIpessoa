import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../../entities/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
pessoa: Pessoa = {
    nome: '',
    ativo: true,
    dataAdmissao: new Date(),
  };

  constructor(private router: Router, private servico: PessoaService) { }
  ngOnInit(): void { }
  cancelar(): void {
    this.router.navigate(['']);
  }

  formatarData(): void {
    let data = new Date(this.pessoa.dataAdmissao).toISOString;
  }

  cadastrar(){
    this.formatarData();
    console.log(this.pessoa);
    this.servico.cadastrar(this.pessoa).subscribe(
      (resposta: any) => {
        this.servico.message('Pessoa cadastrado com sucesso!!!') 
      },
      (err: any) => {
        this.servico.message('Erro ao cadastrar o Pessoa')
      }
    );
  }
}

