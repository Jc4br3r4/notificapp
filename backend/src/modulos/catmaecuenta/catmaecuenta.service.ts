import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from './catmaecuenta.entity';

@Injectable()
export class CuentaService {

  constructor(@InjectRepository(Cuenta)
              private cuentaRepository: Repository<Cuenta>) {}

  async find(persona) {
    return this.cuentaRepository.find({
      where: { persona },
      select: ['id', 'saldo', 'cci', 'tipoTarjeta', 'ncuenta', 'moneda'],
      relations: ['tipoTarjeta', 'moneda'],
      order: { saldo: 'ASC'}
    })
  }

  async read(id, persona) {
    return this.cuentaRepository.findOne({
      where: { id, persona }
    })
  }
}
