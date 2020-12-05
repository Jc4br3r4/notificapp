import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './notificacion.entity';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { Transaccion } from '../catmaetransaccion/catmaetransaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, Transaccion])],
  providers: [NotificacionService],
  controllers: [NotificacionController]
})
export class NotificacionModule {}
