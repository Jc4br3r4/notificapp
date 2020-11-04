import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';


@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, RouterModule.forChild(DashboardRoutes), PerfectScrollbarModule],
  declarations: [
    Dashboard1Component,
  ]
})
export class DashboardModule { }
