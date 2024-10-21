import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../entities/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss'],
})
export class ReadAllComponent implements OnInit {
  ativo = 0;
  inativo = 0;
  list: Pessoa[] = [];
  inativos: Pessoa[] = [];

  constructor(private service: PessoaService, private router: Router) {}
  ngOnInit(): void {
    this.findAll();
  }
  contarAtivos(): void {
    for (let pessoa of this.list) {
      if (pessoa.ativo) this.ativo++;
    }
  }
  contarInativos(): void {
    for (let pessoa of this.inativos) {
      if (!pessoa.ativo) this.inativo++;
    }
  }
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((pessoa) => {
        if (pessoa.ativo) {
          this.list.push(pessoa);
          this.ativo++;
        } else {
          this.inativos.push(pessoa);
          this.inativo++;
        }
      });
    });
    console.log(this.list); // Verifica se a lista está sendo preenchida

  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Registro excluído com sucesso');
        this.list = this.list.filter((pessoa) => pessoa.id != id);
        this.ativo=0;
        this.findAll();
      } else {
        this.service.message('Não foi possível excluir o Registro');
      }
    });
  }

  inativar(item: Pessoa): void {
    item.ativo = false
    this.service.atualizar(item).subscribe(() => {
      this.service.message('pessoa inativado com sucesso');
      this.list = this.list.filter(pessoa => pessoa.id != item.id);
      this.inativo++;
      this.ativo--;
    })
  }
  verInativos() {
    this.router.navigate(['inativos'])
  }

}
