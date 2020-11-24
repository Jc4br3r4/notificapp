import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Cuenta} from '../../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService{

  private api: string = environment.API_ENDPOINT + '/cuenta';
  token: string = localStorage.getItem('token');

  constructor(public http: HttpClient) {}

  cuentas() {
    return this.http.get<[Cuenta]>(`${this.api}/listar`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  cuenta(id: number) {
    return this.http.get<Cuenta>(`${this.api}/${id}`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }
}
