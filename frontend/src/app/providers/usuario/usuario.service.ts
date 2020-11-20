import {Injectable, OnInit} from '@angular/core';
import {User, Usuario, UsuarioDTO, UsuarioLogin} from '../../models/usuario.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import Swal from 'sweetalert2'
import {Compendio} from '../../models/compendio.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  usuario: User;
  username: any = JSON.parse(localStorage.getItem('usuario'));
  public token: string;
  recuerdame: boolean;
  headers = new HttpHeaders();
  private api: string = environment.API_ENDPOINT + '/auth';

  constructor(public http: HttpClient, public  router: Router) {
    this.cargarStorage();
  }


  renuevaToken() {
    let url = this.api + '/login/renuevatoken';
    let authorization =  this.headers.set('Content-Type', 'application/json')
      .append('Authorization', this.token);
    return this.http.get( url , {headers: authorization})
      .pipe(map( (resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token' , this.token);
        return true;

      }), catchError( err => {

        this.router.navigate(['/login']);
        // swal('No se pudo renovar token' , 'No fue posible renovar token', 'error');

        return throwError(err);
      }));

  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    } else {
      this.token = '';
      this.usuario = null;
    }

    this.verifyRemember();
  }

  estaLogueado() {
    return (this.token.length > 5) ;
  }

  guardarStorage(token: string, usuario: UsuarioDTO) {

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;

    localStorage.setItem('token' , token);
    this.token = token;
  }

  actualizarUsuario( usuario: Usuario) {

    const url = this.api + '/usuarios/' + usuario.id;
    let authorization =  this.headers.set('Content-Type', 'application/json')
      .append('Authorization', this.token);
    return this.http.put( url, usuario , {headers: authorization})
      .pipe(
        map( (res: any) => {

          if ( usuario.id === this.usuario.id) {
            let usuariodB: Usuario = res.usuario;
            // this.guardarStorage( usuariodB.id , this.token , usuariodB , this.menu );
          }


          // swal('Usuario actualizado' , usuario.nombre, 'success');

          return true;
        }), catchError( err => {
          // console.log(err.error.mensaje);
          // swal(err.error.mensaje , err.error.errors.message, 'error');
          return throwError(err);
        }));
  }

  verifyRemember() {
    if(localStorage.getItem('username')) {
      this.recuerdame = true;
      this.username = JSON.parse(localStorage.getItem('username'));
    } else {
      this.recuerdame = false;
      this.username = { tipo: 1, documento: null};
    }
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.verifyRemember();
    this.router.navigate(['/login']);


  }

  login( usuario: UsuarioLogin , recordar: boolean = false) {

    if (recordar) {
      const username = JSON.stringify({ tipo: usuario.tipo, documento: usuario.documento });
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }

    const url = this.api + '/login';

    return this.http.post( url, usuario)
      .pipe(
        map( (res: any) => {
          this.guardarStorage(res.token, res.persona);
          return true;
        }), catchError( err => {
          Swal.fire(' Error en el login' , err.error.message, 'error');
          return throwError(err);
        }) );

  }

  register(usuario: Usuario) {
    const url = this.api + '/register';
    return this.http.post( url, usuario)
      .pipe(
        map( (res: any) => {
          Swal.fire('Clave web generada', 'Nº ' + usuario.documento + ' bienvenido' , 'success');
        }), catchError( err => {
          Swal.fire('Ah ocurrido un error!', err.error.message, 'error');
          return throwError(err);
        }));
  }

  whoami() {
    return this.http.get<User>(`${this.api}/whoiam`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  actualizarEmail(cambiarEmail: any) {
    const url = this.api + '/cambiar-email'

    return this.http.post( url, cambiarEmail, {
      headers: { authorization: `Bearer ${this.token}` }
    })
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.token, res.persona);
          Swal.fire('Su email a sido actualizado a:', res.persona.email , 'success');
          return true
        }) , catchError( (err) => {
          Swal.fire('A ocurrido un error!', err.error.message, 'error');
          return throwError(err);
        })
      )
  }


}
