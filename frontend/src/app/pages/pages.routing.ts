import { Routes } from '@angular/router';
import {PerfilComponent} from './perfil/perfil.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {SaldoComponent} from './saldos/saldo.component';
import {TransferenciasComponent} from './transferencias/transferencias.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          title: 'Mi perfil',
          urls: [{ title: 'Persona', url: '/perfil' }, { title: 'Mi perfil' }]
        }
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        data: {
          title: 'Configuracion',
          urls: [{ title: 'Persona', url: '/configuracion' }, { title: 'Configuracion' }]
        }
      },
      {
        path: 'detalle-de-tu-cuenta/:id',
        component: SaldoComponent,
        data: {
          title: 'Ahorro Soles',
          urls: [{ title: 'Cuenta', url: '/detalle-de-tu-cuenta' }, { title: 'Saldos' }]
        }
      },
      {
        path: 'transferencias/propias-cuentas',
        component: TransferenciasComponent,
        data: {
          title: 'Transferencias',
          urls: [{ title: 'Trasnferenciaa', url: '/transferencias/propias-cuentas' }, { title: 'Transfiere' }]
        }
      },
    ]
  }
];
