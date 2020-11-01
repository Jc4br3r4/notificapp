import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate  {

  constructor( public usuarioService: UsuarioService,
               private activatedRoute: ActivatedRoute,
               public router: Router) {}

  canActivate() {

    if( this.usuarioService.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    }else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
