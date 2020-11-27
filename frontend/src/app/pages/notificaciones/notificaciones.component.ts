import { Component, OnInit } from '@angular/core';
import {NotificacionService} from '../../providers/notificacion/notificacion.service';
import {Notificacion} from '../../models/cuenta';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notificacion[] = []

  constructor(private _notificacionService: NotificacionService) { }

  ngOnInit(): void {
    this._notificacionService.notificaciones().subscribe((notificaciones) => {
      this.notificaciones = notificaciones
    })
  }

}
