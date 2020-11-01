import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {Compendio} from '../../models/compendio.model';

@Injectable({
  providedIn: 'root'
})
export class CompendioService {
  URL_SERVICIO = environment.API_ENDPOINT;

  constructor( public http: HttpClient) {}

  findCompendio(id: number) {
    const url = this.URL_SERVICIO + `/detalle-compendio/table/${ id }`;
    return this.http.get( url )
      .pipe(
        map( (res: Compendio[]) => res ));
  }
}
