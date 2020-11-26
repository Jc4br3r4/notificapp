import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import {Cuenta, Saldo} from '../../models/cuenta';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  cuenta: Cuenta;
  saldos: Saldo[] = [];
  id: number;
  constructor(public _cuentaService: CuentaService,
              public _transferenciaService: TransferenciaService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getCuenta();
    this.getSaldos();
  }

  getCuenta() {
    this._cuentaService.cuenta(this.id).subscribe( (cuenta) => {
      this.cuenta = cuenta;
    })
  }

  getSaldos() {
    this._transferenciaService.saldos(this.id).subscribe( (saldos: [Saldo]) => {
      this.saldos = saldos
    });
  }

  get contable() {
    let saldos = 0;
    let contable = 0;
    if(this.saldos.length > 0) {
      // @ts-ignore
      saldos = this.saldos.reduce((a, b) => {
        return parseFloat(String(a.monto)) + parseFloat(String(b.monto))
      })
    }

    if(this.cuenta && this.cuenta.saldo > 0) {
      contable = this.cuenta.saldo - saldos;
    } else {
      contable = saldos - this.cuenta.saldo
    }
     return contable
  }
}
