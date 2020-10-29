import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';


const routes: Routes = [{
  path: "login",
  component: LoginComponent,
  loadChildren: () => import("src/app/modules/auth/auth.module").then((m)=>m.AuthModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
