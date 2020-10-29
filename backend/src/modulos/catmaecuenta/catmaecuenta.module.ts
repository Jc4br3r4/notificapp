import { Module } from '@nestjs/common';
import { CuentaService } from './catmaecuenta.service';
import { CuentaController } from './catmaecuenta.controller';

@Module({
  providers: [CuentaService],
  controllers: [CuentaController]
})
export class CuentaModule {}
