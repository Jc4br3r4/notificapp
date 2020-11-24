import { Module } from '@nestjs/common';
import { CuentaService } from './catmaecuenta.service';
import { CuentaController } from './catmaecuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './catmaecuenta.entity';
import { AppGateway } from '../../events/app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  providers: [CuentaService, AppGateway],
  controllers: [CuentaController]
})
export class CuentaModule {}
