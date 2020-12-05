import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import {Cuenta} from '../../models/cuenta';
import {UsuarioService} from '../../providers/usuario/usuario.service';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';

@Component({
	templateUrl: './dashboard1.component.html',
	styleUrls: ['./dashboard1.component.css'],
})
export class Dashboard1Component implements  OnInit{

  cuentas: Cuenta[] = [];
	constructor(public router: Router,
              private _cuentaService: CuentaService,
              private _usuaarioService: UsuarioService,
              private _transferenciaService: TransferenciaService) {
	}

  ngOnInit(): void {
	  this.misCuentas()

    this._transferenciaService.actualizaSaldoReceptor().subscribe((cuentas: Cuenta[]) => {
      this.cuentas = cuentas
    })
  }

	misCuentas() {
	  this._cuentaService.cuentas().subscribe((cuentas: Cuenta[]) => {
	    this.cuentas = cuentas
    })
  }

}
