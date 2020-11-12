import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import {LoginGuard} from './providers/service.index';
import {AuthGuard} from './providers/guard/auth.guard';

export const Approutes: Routes = [
	{
		path: '',
    canActivate: [ LoginGuard ],
		component: FullComponent,
		children: [
			{ path: '', redirectTo: '/main', pathMatch: 'full' },
			{
				path: '',
				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
			},
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
		]
	},
	{
		path: '',
		component: BlankComponent,
    canActivate: [ AuthGuard ],
		children: [
			{
				path: '',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: '/404'
	}
];
