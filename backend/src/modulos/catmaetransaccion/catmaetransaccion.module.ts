import { Module } from '@nestjs/common';
import { TransaccionService } from './catmaetransaccion.service';
import { TransaccionController } from './catmaetransaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaccion } from './catmaetransaccion.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';
import { AppGateway } from '../../events/app.gateway';
import { UsersOnline } from '../usersonline/usersonline.entity';
import { Notificacion } from '../catmaenotificacion/notificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaccion, Cuenta, UsersOnline, Notificacion])],
  providers: [TransaccionService, AppGateway],
  controllers: [TransaccionController]
})
export class TransaccionModule {}
