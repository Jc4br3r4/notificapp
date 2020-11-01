import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetalleCompendio } from './catdetcompendio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetalleService {

  constructor(@InjectRepository(DetalleCompendio)
              private detalleRepository: Repository<DetalleCompendio>) {}

  async find(compendio: number): Promise<DetalleCompendio[]> {
    return await this.detalleRepository.find({
      where: { compendio },
      order: { id: 'ASC'}
    });
  }

  async read(id: number): Promise<DetalleCompendio> {
    return await this.detalleRepository.findOne({
      where: { id },
    });
  }

  async create(data): Promise<DetalleCompendio> {
    const detalle: any = await this.detalleRepository.create(data);

    await this.detalleRepository.save(detalle);

    if (!detalle) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return await this.detalleRepository.findOne({
      where: { id: detalle.id },
    });
  }

  async update(id: number, data): Promise<DetalleCompendio> {
    let compendio = await this.detalleRepository.findOne({
      where: { id },
    });

    if (!compendio) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.detalleRepository.update({ id }, data);
    compendio = await this.detalleRepository.findOne({
      where: { id },
    });

    return compendio;
  }

  async remove(id: number) {
    const compendio = await this.detalleRepository.findOne({
      where: { id },
    });
    if (!compendio) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.detalleRepository.remove(compendio);
    return true;
  }
}
