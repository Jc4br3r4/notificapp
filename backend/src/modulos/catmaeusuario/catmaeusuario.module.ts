import { Module } from '@nestjs/common';
import { UsuarioService } from './catmaeusuario.service';
import { UsuarioController } from './catmaeusuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './catmaeusuario.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';
import { Persona } from '../catmaepersona/catmaepersona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cuenta, Persona])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
