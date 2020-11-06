import { Routes } from '@angular/router';
import {PerfilComponent} from './perfil/perfil.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';

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
    ]
  }
];
