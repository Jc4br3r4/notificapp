import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {PerfilComponent} from './perfil/perfil.component';
import {PagesRoutes} from './pages.routing';
import {SaldoComponent} from './saldos/saldo.component';
import {UsuarioService} from '../providers/service.index';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { TransferenciaTerceroComponent } from './transferencia-tercero/transferencia-tercero.component';

@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, RouterModule.forChild(PagesRoutes), PerfectScrollbarModule, ReactiveFormsModule],
  declarations: [
    ConfiguracionComponent,
    PerfilComponent,
    SaldoComponent,
    TransferenciasComponent,
    NotificacionesComponent,
    TransferenciaTerceroComponent
  ],
  providers: [
    UsuarioService
  ],
})
export class PagesModule { }
