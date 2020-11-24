import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './notificacion.entity';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  providers: [NotificacionService],
  controllers: [NotificacionController]
})
export class NotificacionModule {}
