import { Routes } from '@angular/router';
import {PerfilComponent} from './perfil/perfil.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {SaldoComponent} from './saldos/saldo.component';
import {TransferenciasComponent} from './transferencias/transferencias.component';
import {NotificacionesComponent} from './notificaciones/notificaciones.component';
import {TransferenciaTerceroComponent} from './transferencia-tercero/transferencia-tercero.component';
import {TransfereciaReceptorComponent} from './transferecia-receptor/transferecia-receptor.component';
import {TransfereciaEmisorComponent} from './transferecia-emisor/transferecia-emisor.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          title: 'Mi perfil',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Perfil' }]
        }
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        data: {
          title: 'Configuracion',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Configuracion' }]
        }
      },
      {
        path: 'detalle-de-tu-cuenta/:id',
        component: SaldoComponent,
        data: {
          title: 'Ahorro Soles',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Saldos' }]
        }
      },
      {
        path: 'transferencias/propias-cuentas',
        component: TransferenciasComponent,
        data: {
          title: 'Transferencias propias cuentas',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Transfiere' }]
        }
      },
      {
        path: 'transferencias/a-terceros',
        component: TransferenciaTerceroComponent,
        data: {
          title: 'Transferencias a tercero',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Transfiere' }]
        }
      },
      {
        path: 'transferencias/aceptar-transferencia/:id',
        component: TransfereciaReceptorComponent,
        data: {
          title: 'Transferencia bancaria',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Transfiere' }]
        }
      },
      {
        path: 'transferencias/confirmar-transferencia/:id',
        component: TransfereciaEmisorComponent,
        data: {
          title: 'Transferencia bancaria',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Transfiere' }]
        }
      },
      {
        path: 'notificaciones',
        component: NotificacionesComponent,
        data: {
          title: 'Notificaciones',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Notificaciones' }]
        }
      },
    ]
  }
];
