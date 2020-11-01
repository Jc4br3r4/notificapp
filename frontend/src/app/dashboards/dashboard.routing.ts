import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Dashboard1Component,
        data: {
          title: 'Render BCP',
          urls: [{ title: 'Main', url: '/main' }, { title: 'Render BCP' }]
        }
      },
    ]
  }
];
