import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class AuthGuard implements CanActivate  {

  constructor( public usuarioService: UsuarioService,
               private activatedRoute: ActivatedRoute,
               public router: Router) {}

  canActivate() {
    const logeado = this.usuarioService.estaLogueado();
    console.log(logeado);

    if(this.usuarioService.estaLogueado()) {
      console.log('Paso por el guard');
      this.router.navigate(['/main']);
      return false;

    }else {
      console.log('Bloqueado por el guard');
      return true;

    }

  }
}
