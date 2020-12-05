import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notificacion.entity';

@Injectable()
export class NotificacionService {

  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
  ) {}


  async find(persona) {
    return await this.notificacionRepository.find({
      select: ['id','transaccion_id','tipo', 'mensaje', 'created', 'created_by', 'show', 'estado'],
      where: { persona },
    });
  }

  async mostrecents(persona) {
    return await this.notificacionRepository.find({
      select: ['id','transaccion_id','tipo', 'mensaje', 'created', 'created_by', 'show', 'estado'],
      where: { persona },
      take: 5,
      order: { created: 'DESC'}
    });
  }

}
