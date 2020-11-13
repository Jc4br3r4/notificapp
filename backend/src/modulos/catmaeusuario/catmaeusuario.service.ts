import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
    const persona = await this.personaRepository.findOne({
      where: {
          tipoDoc: data.tipo,
          numDoc: data.documento
      }
    })

    if (!persona) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      relations: ['persona'],
      where: { persona }
    })

    if (!user || !(await user.comparePassword(data.password))) {
      throw new HttpException('Nª Documento/Clave Web invalido', HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject();
  }

  async register(data) {

    const persona = await this.personaRepository.findOne({
      where: { numDoc: data.documento, tipoDoc: data.tipo }
    })

    const userExist = await this.userRepository.findOne({
      where: { persona }
    })

    if (userExist) {
      throw new HttpException('Usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const cuenta = this.cuentaRepository.findOne({
      where: { tarjeta: data.tarjeta, clave: data.clave }
    })

    if (!cuenta) {
      throw new HttpException('Nª de Tarjeta no existe', HttpStatus.BAD_REQUEST);
    }

    //* Guardar usuario web *//
    const usuario = await this.userRepository.create({
      claveWeb: data.password,
      persona
    })

    await this.userRepository.save(usuario);

    return true;
  }

  async cambiarEmail(data) {

    const persona = await this.personaRepository.findOne({ id: data.id });

    if (!persona) {
      throw new HttpException('Persona no encontrada', HttpStatus.NOT_FOUND);
    }

    let user = await this.userRepository.findOne({
      relations: ['persona'],
      where: { persona }
    })

    if (!user || !(await user.comparePassword(data.password))) {
      throw new HttpException('Clave Web invalida verifique', HttpStatus.BAD_REQUEST);
    }

    await this.personaRepository.update({id: data.id},  { email: data.email })

    user = await this.userRepository.findOne({
      relations: ['persona'],
      where: { persona }
    })

    return user.toResponseObject();
  }
}
