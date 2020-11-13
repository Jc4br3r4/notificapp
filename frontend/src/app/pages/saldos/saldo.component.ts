import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../providers/usuario/usuario.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-saldos',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

}
