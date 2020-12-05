import { Component, OnInit } from '@angular/core';
import {Transferencia} from '../../models/cuenta';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-transferecia-emisor',
  templateUrl: './transferecia-emisor.component.html',
  styleUrls: ['./transferecia-emisor.component.css']
})
export class TransfereciaEmisorComponent implements OnInit {

  id: number;
  transferencia: Transferencia;
  constructor(private transferenciaService: TransferenciaService,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.confirmarTransferencia();
  }

  confirmarTransferencia() {
    this.transferenciaService.confirmarTransferencia(this.id).subscribe((data) => {
      this.transferencia = data;
    });
  }

  guardarTransferencia() {

    const data = {
      id: this.id,
      estado: 'C'
    }

    this.transferenciaService.confirmaEstado(data).then(async (data) => {
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
