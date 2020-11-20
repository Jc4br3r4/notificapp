import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../providers/usuario/usuario.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;
  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.dataForm();
  }

  dataForm() {
    this.form = new FormGroup(
      {
        email1: new FormControl(null, [Validators.required, Validators.email]),
        email2: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      },
      { validators: this.sonIguales('email1', 'email2') }
    );
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  cambiaCorreo() {
    if (this.form.invalid) {
      return;
    }

    let cambiarEmail = {
      id: this._usuarioService.usuario.id,
      email: this.form.value.email1,
      password: this.form.value.password,
    }

    this._usuarioService.actualizarEmail(cambiarEmail).subscribe((data) => {
      if(data) {
        this.form.reset();
      }
    });
  }
}
