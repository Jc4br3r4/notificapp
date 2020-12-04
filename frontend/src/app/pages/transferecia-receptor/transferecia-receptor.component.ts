import { Component, OnInit } from '@angular/core';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
import {Transferencia} from '../../models/cuenta';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transferecia-receptor',
  templateUrl: './transferecia-receptor.component.html',
  styleUrls: ['./transferecia-receptor.component.css']
})
export class TransfereciaReceptorComponent implements OnInit {

  id: number;
  transferencia: Transferencia;
  constructor(private transferenciaService: TransferenciaService,
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
  }
}
