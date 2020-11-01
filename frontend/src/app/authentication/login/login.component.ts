import {Component, OnInit} from '@angular/core';
import {Compendio} from '../../models/compendio.model';
import {CompendioService} from '../../providers/compendio/compendio.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario, UsuarioLogin} from '../../models/usuario.model';
import {UsuarioService} from '../../providers/usuario/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  recoverform = false;
  tiposDocumentos: Compendio[] = [];
  form: FormGroup;

  constructor(public _compendioService: CompendioService,
              public router: Router,
              public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.dataForm();
    this.getTipoDocumentoPersona();
  }

  dataForm() {
    this.form = new FormGroup(
      {
        tipo: new FormControl(this._usuarioService.username.tipo, Validators.required),
        documento: new FormControl(this._usuarioService.username.documento, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
        recuerdame: new FormControl(this._usuarioService.recuerdame)
      }
    );
  }

  getTipoDocumentoPersona() {
    this._compendioService.findCompendio(1)
      .subscribe( compendio => this.tiposDocumentos = compendio);
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    let usuario = new UsuarioLogin(
      this.form.value.tipo,
      this.form.value.documento,
      this.form.value.password
    );

    this._usuarioService
      .login(usuario, this.form.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/']));
  }
}
