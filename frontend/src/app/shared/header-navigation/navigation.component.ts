import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {UsuarioService} from '../../providers/usuario/usuario.service';
import {NotificacionService} from '../../providers/notificacion/notificacion.service';
import {Notificacion} from '../../models/cuenta';
import {TransferenciaService} from '../../providers/transferencia/transferencia.service';
declare var $: any;


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  nombre: string = '';
  email: string = '';
  nuevaNotificacion: boolean = false;
  constructor(private _usuarioService: UsuarioService,
              private _notificacionService: NotificacionService,
              private transferenciaService: TransferenciaService,) {
    this.nombre = (this._usuarioService.usuario.nombres).toString().split(' ')[0] + ' ' + this._usuarioService.usuario.apePaterno;
    this.email = this._usuarioService.usuario.email;
  }

  notifications: Notificacion[] = [];

  ngOnInit() {
    this._notificacionService.mostrecent().subscribe((data) => {
      this.notifications = data;
    })

    this.transferenciaService.transferenciaPendiente().subscribe((msj: Notificacion) => {
      this.notifications.unshift(msj);
      this.nuevaNotificacion = true;
    })

    this.actualizaNotificacion();
  }

  logout() {
    this._usuarioService.logout();
  }

  actualizaNotificacion() {
    setInterval(() => {
      this._notificacionService.mostrecent().subscribe((data) => {

        if(this.notifications.length < data.length) {
          this.nuevaNotificacion = true;
        }
        this.notifications = data;
      })
    }, 60000 * 5)
  }
}
