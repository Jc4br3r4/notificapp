
export class Usuario {

  constructor(
    public tarjeta: number,
    public clave: number,
    public tipo: number,
    public documento: number,
    public password: string,
    public id?: number
  ) {}
}

export class UsuarioLogin {

  constructor(
    public tipo: number,
    public documento: number,
    public password: string,
  ) {}
}


export class UsuarioDTO {

  constructor(
    public nombres: number,
    public apePaterno: number,
    public apeMaterno: number,
    public email: string,
    public numDoc: string,
    public fechNac: Date,
    public id?: number
  ) {}
}
