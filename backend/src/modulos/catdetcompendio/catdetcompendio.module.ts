import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCompendio } from './catdetcompendio.entity';
import { DetalleService } from './catdetcompendio.service';
import { DetalleController } from './catdetcompendio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCompendio])],
  providers: [DetalleService],
  controllers: [DetalleController]
})
export class DetalleModule {}
