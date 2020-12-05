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
  created: Date;
  transaccion_id: number;
  created_by: number;
  show: boolean;
  estado: string;
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


export interface Transferencia {
  id: number;
  paterno: string;
  materno: string;
  nombres: string;
  monto: number;
  descripcion: string;
  estado: string;
  createdat: Date;
}
