import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import {Cuenta} from '../../models/cuenta';

@Component({
	templateUrl: './dashboard1.component.html',
	styleUrls: ['./dashboard1.component.css'],
})
export class Dashboard1Component implements  OnInit{

  cuentas: Cuenta[] = [];
	constructor(public router: Router, public _cuentaService: CuentaService) {
	}

  ngOnInit(): void {
	  this.misCuentas()
  }

	misCuentas() {
	  this._cuentaService.cuentas().subscribe((cuentas: [Cuenta]) => {
	    this.cuentas = cuentas
    })
  }



	// openSaldos(id) {
  //   this.router.navigate(['/detalle-de-tu-cuenta'] );
  //
  // }
}
