import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../../entities/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-inativos',
  templateUrl: './inativos.component.html',
  styleUrls: ['./inativos.component.scss']
})
export class InativosComponent implements OnInit {
inativos : Pessoa[] = []
inativo = 0

constructor(private service: PessoaService, private router: Router) {}
ngOnInit(): void {
  this.findAll();
}

findAll(): void {
  this.service.findAll().subscribe((resposta) => {
    resposta.forEach((pessoa) => {
      if (!pessoa.ativo) {
        this.inativos.push(pessoa);
        this.inativo++;
      } 
    });
  });
}

verAtivos() {
  this.router.navigate([''])
}

}
