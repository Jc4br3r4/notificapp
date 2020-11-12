import {Component, OnInit} from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../models/usuario.model';
import {CompendioService, UsuarioService} from '../../providers/service.index';
import {Router} from '@angular/router';
import {Compendio} from '../../models/compendio.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  model: NgbDateStruct = Object.create(null);
  tiposDocumentos: Compendio[] = [];
  form: FormGroup;

  constructor(public _usuarioService: UsuarioService,
              public _compendioService: CompendioService,
              public router: Router,
              private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>) {}


  ngOnInit() {
    this.form = new FormGroup(
      {
        tarjeta: new FormControl(null, [Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16)]),
        clave: new FormControl(null, [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)]),
        tipo: new FormControl(1, Validators.required),
        documento: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        password2: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.getTipoDocumentoPersona();
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
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

  getTipoDocumentoPersona() {
    this._compendioService.findCompendio(1)
      .subscribe( compendio => this.tiposDocumentos = compendio);
  }
  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }

    let usuario = new Usuario(
      this.form.value.tarjeta,
      this.form.value.clave,
      this.form.value.tipo,
      this.form.value.documento,
      this.form.value.password
    );

    this._usuarioService
      .register(usuario)
      .subscribe(resp => this.router.navigate(['/authentication/login']));
  }
  onlynumber($event) {
    return $event.charCode >= 48 && $event.charCode <= 57
  }
}
