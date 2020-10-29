import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './catmaeusuario.entity';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>
  ) {}

  async login(data) {
    const persona = this.personaRepository.findOne({
      where: { numDoc: data.numDoc }
    })

    if (!persona) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const user = this.userRepository.findOne({
      where: { claveWeb: data.claveWeb, persona }
    })

    if (!user) {
      throw new HttpException('Password Error', HttpStatus.NOT_FOUND);
    }

    return true
  }

  async register(data) {

    const persona = this.personaRepository.findOne({
      where: { numDoc: data.numDoc }
    })

    if (persona) {
      throw new HttpException('Cannot Register', HttpStatus.NOT_FOUND);
    }

    const cuenta = this.cuentaRepository.findOne({
      where: { tarjeta: data.tarjeta, clave: data.clave }
    })

    if (!cuenta) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    //* Guardar personas *//
    const nPersona = await this.personaRepository.create({
      numDoc: data.numDoc,
      nombres: data.nombres,
      apeMaterno: data.apeMaterno,
      apePaterno: data.apePaterno,
      fechNac: data.fechNac,
      tipoDoc: data.tipoDoc
    });

    await this.personaRepository.save(nPersona);

    //* Guardar usuario web *//
    await this.userRepository.create({
      claveWeb: data.claveWeb,
      persona: nPersona
    })

    return true;
  }
}
