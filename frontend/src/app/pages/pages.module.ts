import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {PerfilComponent} from './perfil/perfil.component';
import {PagesRoutes} from './pages.routing';
import {SaldoComponent} from './saldos/saldo.component';

@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, RouterModule.forChild(PagesRoutes), PerfectScrollbarModule, ReactiveFormsModule],
  declarations: [
    ConfiguracionComponent,
    PerfilComponent,
    SaldoComponent
  ]
})
export class PagesModule { }
