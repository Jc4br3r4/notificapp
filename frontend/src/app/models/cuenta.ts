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
