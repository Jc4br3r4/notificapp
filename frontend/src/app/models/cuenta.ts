export interface Cuenta {
  id: number;
  ncuenta: string;
  cci: string;
  saldo: number;
  tipoTarjeta: DetalleCompendio;
  moneda: DetalleCompendio
}

export interface DetalleCompendio {
  nombre: string
}


export interface Emmited {
  evento: string;
  payload?: any,
  callback?: Function
}


export interface Notificacion {
  tipo: string;
  mensaje: string;
  created: Date
}

export interface  Saldo {
  created: Date
  descripcion: string;
  estado: string;
  id: number;
  monto: number;
  destino: number;
  origen: number;
}
