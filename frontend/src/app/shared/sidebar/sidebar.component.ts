import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsuarioService} from '../../providers/usuario/usuario.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  nombre: string = '';
  public sidebarnavItems: RouteInfo[] = [];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }

  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _usuarioService: UsuarioService,
  ) {
    const location = [];
    const myurl = [];

    for (let i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].submenu.length > 0) {
        location.push(ROUTES[i].title);
        myurl.push(ROUTES[i].path);
      }
    }

    for (let i = 0; i < ROUTES.length; i++) {
      if (this.router.url.includes(myurl[i])) {
        this.addExpandClass(location[i]);
      }
    }
  }

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.nombre = (this._usuarioService.usuario.nombres).toString().split(' ')[0] + ' ' + this._usuarioService.usuario.apePaterno;
  }


  logout() {
    this._usuarioService.logout();
  }
}
