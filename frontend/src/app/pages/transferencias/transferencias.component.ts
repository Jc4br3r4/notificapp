import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebsocketService} from '../../providers/socket/websocket.service';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
import {Cuenta} from '../../models/cuenta';
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  form: FormGroup;
  cuentas: Cuenta[] = [];

  constructor(public wsService: WebsocketService,
              public transferenciaService: TransferenciaService,
              private _cuentaService: CuentaService,) { }


  ngOnInit(): void {
    this.misCuentas()
    this.dataForm();
  }

  dataForm() {
    this.form = new FormGroup({
      origen: new FormControl( null, [Validators.required]),
      destino: new FormControl(null, [Validators.required]),
      monto: new FormControl(null, [Validators.required]),
      });
  }

  misCuentas() {
    this._cuentaService.cuentas().subscribe((cuentas: [Cuenta]) => {
      this.cuentas = cuentas
      this.form.patchValue({
        origen: cuentas[0].ncuenta
      });
    })
  }

  transferir() {

    const data = { ...this.form.value, estado: 'P', monto: parseFloat(this.form.value.monto)}
    this.transferenciaService.estadoTransferencia(data).then(( data ) => {
      if(data) {
        Swal.fire(
          'Transferencia realizada!',
          'La cuenta destino debe aceptar su transferencia',
          'success'
        )
        this.form.reset();
        this.form.patchValue({
          origen: this.cuentas[0].ncuenta
        });
      }

    }).catch(({ error }) => {
      Swal.fire(
        'Error ' + error.statusCode,
        error.message,
        'error'
      )
    })
    // this.transferenciaService.enviaTransferencia(data)
  }
}
