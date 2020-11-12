import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {PerfilComponent} from './perfil/perfil.component';
import {PagesRoutes} from './pages.routing';

@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, RouterModule.forChild(PagesRoutes), PerfectScrollbarModule],
  declarations: [
    ConfiguracionComponent,
    PerfilComponent
  ]
})
export class PagesModule { }
