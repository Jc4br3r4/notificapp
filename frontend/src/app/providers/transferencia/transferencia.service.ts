import { Injectable } from '@angular/core';
import {WebsocketService} from '../socket/websocket.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private api: string = environment.API_ENDPOINT + '/transaccion';
  token: string = localStorage.getItem('token');

  constructor(
    public wsService: WebsocketService,
    public http: HttpClient
  ) { }

  transferenciaPendiente() {
    return this.wsService.listen('transferencia-pendiente')
  }

  estadoTransferencia(data) {
    return this.http.post<any>(`${this.api}/estado-transferencia`, data ,{
      headers: { authorization: `Bearer ${this.token}` }
    }).toPromise();
  }
}
