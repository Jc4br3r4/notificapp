import { Component, OnInit } from '@angular/core';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
import {Transferencia} from '../../models/cuenta';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-transferecia-receptor',
  templateUrl: './transferecia-receptor.component.html',
  styleUrls: ['./transferecia-receptor.component.css']
})
export class TransfereciaReceptorComponent implements OnInit {

  id: number;
  transferencia: Transferencia;
  constructor(private transferenciaService: TransferenciaService,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.aceptarTransferencia();
  }

  aceptarTransferencia() {
    this.transferenciaService.aceptarTransferencia(this.id).subscribe((data) => {
      this.transferencia = data;
    });
  }

  guardarTransferencia() {

    const data = {
      id: this.id,
      estado: 'E'
    }

    this.transferenciaService.cambiaEstado(data).then(async (data) => {
      if(data) {
        await Swal.fire(
          'Aceptar Transferencia!',
          'La transferencia pendiente de confirmacion',
          'success'
        )

        await this.router.navigate(['/main']);
      }

    }).catch(({ error }) => {
       Swal.fire(
        'Error ' + error.statusCode,
        error.message,
        'error'
      )
    })
  }

  cancelar() {

    const data = {
      id: this.id,
      estado: 'F'
    }

    this.transferenciaService.cancelaTransferencia(data).then(async (data) => {
      if(data) {
        await Swal.fire(
          'Transferencia Cancelada!',
          'La transferencia fue cancelada',
          'success'
        )
        await this.router.navigate(['/main']);
      }
    })
  }
}
