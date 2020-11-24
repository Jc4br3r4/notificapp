import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebsocketService} from '../../providers/socket/websocket.service';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  form: FormGroup;

  constructor(public wsService: WebsocketService,
              public transferenciaService: TransferenciaService) { }


  ngOnInit(): void {
    this.dataForm();
  }

  dataForm() {
    this.form = new FormGroup({
      cuenta: new FormControl(null, [Validators.required]),
      monto: new FormControl(null, [Validators.required]),
      });
  }

  transferir() {

    const data = { ...this.form.value, estado: 'P', monto: parseFloat(this.form.value.monto)}
    this.transferenciaService.estadoTransferencia(data).subscribe(( data ) => {
      console.log(data)
    })
    // this.transferenciaService.enviaTransferencia(data)
  }
}
