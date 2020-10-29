import { Module } from '@nestjs/common';
import { CompendioService } from './catmaecompendio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compendio } from './catmaecompendio.entity';
import { CompendioController } from './catmaecompendio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Compendio])],
  providers: [CompendioService],
  controllers: [CompendioController]
})
export class CompendioModule {}
