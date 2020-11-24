import { Injectable } from '@angular/core';
import {WebsocketService} from '../socket/websocket.service';
import {environment} from '../../../environments/environment';
import {Cuenta} from '../../models/cuenta';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private api: string = environment.API_ENDPOINT + '/notificaciones';
  token: string = localStorage.getItem('token');

  constructor(
    public wsService: WebsocketService,
    public http: HttpClient
  ) { }

  notificaciones() {
    return this.http.get<any>(`${this.api}`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  mostrecent() {
    return this.http.get<any>(`${this.api}/most-recent`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }
  sendNotificacion( mensaje: string ) {
    const payload = {
      de: 'Jorge',
      cuerpo: mensaje
    }

    this.wsService.emit('notificacion', payload);
  }

  getNotificacaion() {
    return this.wsService.listen('nueva-notificacion')
  }
}
