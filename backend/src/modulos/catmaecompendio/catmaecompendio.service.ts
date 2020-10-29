import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compendio } from './catmaecompendio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompendioService {
  constructor(
    @InjectRepository(Compendio)
    private compendioRepository: Repository<Compendio>
  ) {}

  async find(): Promise<Compendio[]> {
    return await this.compendioRepository.find();
  }

  async read(id: number): Promise<Compendio> {
    return await this.compendioRepository.findOne({
      where: { id },
    });
  }

  async create(data): Promise<Compendio> {
    const compendio = await this.compendioRepository.create(data);
    return await this.compendioRepository.save(compendio).catch((err) => err);
  }

  async update(id: number, data: Partial<Compendio>): Promise<Compendio> {
    const compendio = await this.compendioRepository.findOne({
      where: { id },
    });

    if (!compendio) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.compendioRepository.update({ id }, data);
    return await this.compendioRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const compendio = await this.compendioRepository.findOne({
      where: { id },
    });

    if (!compendio) {
      return false;
    }

    await this.compendioRepository.remove(compendio);
    return true;
  }
}
