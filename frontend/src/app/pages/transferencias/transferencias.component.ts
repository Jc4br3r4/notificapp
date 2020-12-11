import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
import {Cuenta} from '../../models/cuenta';
import {CuentaService} from '../../providers/cuenta/cuenta.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  form: FormGroup;
  cuentas: Cuenta[] = [];

  constructor(public transferenciaService: TransferenciaService,
              private _cuentaService: CuentaService,
              public router: Router,) { }


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
    })
  }

  transferir() {

    const data = { ...this.form.value, monto: parseFloat(this.form.value.monto)}
    this.transferenciaService.transferenciaCuentasPropias(data).then(( data ) => {
      if(data) {
        Swal.fire(
          'Transferencia realizada!',
          'Se ha realizado la transferencia entre sus cuentas',
          'success'
        )

        this.router.navigate(['/main'] );
      }
    }).catch(({ error }) => {
      Swal.fire(
        'Error ' + error.statusCode,
        error.message,
        'error'
      )
    })
    this.form.reset();

  }
  onlynumber($event) {
    return $event.charCode >= 46 && $event.charCode <= 57
  }
}
