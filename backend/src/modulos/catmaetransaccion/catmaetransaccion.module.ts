import { Module } from '@nestjs/common';
import { TransaccionService } from './catmaetransaccion.service';
import { TransaccionController } from './catmaetransaccion.controller';

@Module({
  providers: [TransaccionService],
  controllers: [TransaccionController]
})
export class TransaccionModule {}
