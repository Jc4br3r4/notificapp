
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
    public nombres: string,
    public apePaterno: string,
    public apeMaterno: string,
    public email: string,
    public numDoc: string,
    public fechNac: Date,
    public id?: number
  ) {}
}

export class User {
  constructor(
    public nombres: string,
    public apePaterno: string,
    public apeMaterno: string,
    public email: string,
    public numDoc: string,
    public fechNac: Date,
    public id?: number
  ) {}
}
