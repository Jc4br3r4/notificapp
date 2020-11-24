import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import {Cuenta} from '../../models/cuenta';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  cuenta: Cuenta;

  constructor(public _cuentaService: CuentaService,
              private route: ActivatedRoute) {

    const id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this._cuentaService.cuenta(id).subscribe( (cuenta) => {
      this.cuenta = cuenta;
    })
  }

}
