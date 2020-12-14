import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Transacciones',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
  {
    path: '',
    title: 'Transferencias',
    icon: 'mdi mdi-adjust',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/transferencias/propias-cuentas',
        title: 'Entre mis propias cuentas',
        icon: 'mdi mdi-border-all',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/transferencias/a-terceros',
        title: 'A otras cuentas del BCP',
        icon: 'mdi mdi-border-all',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  // {
  //   path: '',
  //   title: 'Pagos',
  //   icon: 'mdi mdi-adjust',
  //   class: '',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/pagos/servicios',
  //       title: 'Pagar un servicio',
  //       icon: 'mdi mdi-border-all',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/pagos/tarjetas',
  //       title: 'Pagar tarjetas de crédito',
  //       icon: 'mdi mdi-border-all',
  //       class: '',
  //       label: '',
  //       labelClass: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //   ]
  // },
];
