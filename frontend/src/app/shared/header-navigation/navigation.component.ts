import {Component, AfterViewInit, EventEmitter, Output, OnInit} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {UsuarioDTO} from '../../models/usuario.model';
import {UsuarioService} from '../../providers/usuario/usuario.service';
import {NotificacionService} from '../../providers/notificacion/notificacion.service';
import {Notificacion} from '../../models/cuenta';
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

  constructor(public _usuarioService: UsuarioService,
              public _notificacionService: NotificacionService) {
    this.nombre = (this._usuarioService.usuario.nombres).toString().split(' ')[0] + ' ' + this._usuarioService.usuario.apePaterno;
    this.email = this._usuarioService.usuario.email;
  }

  // This is for Notifications
  notifications: Notificacion[] = [];

  ngOnInit() {
    this._notificacionService.mostrecent().subscribe((data) => {
      this.notifications = data;
    })
  }

  logout() {
    this._usuarioService.logout();
  }
}
