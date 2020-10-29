import { Module } from '@nestjs/common';
import { CompendioModule } from './catmaecompendio/catmaecompendio.module';
import { DetalleModule } from './catdetcompendio/catdetcompendio.module';
import { CuentaModule } from './catmaecuenta/catmaecuenta.module';
import { TransaccionModule } from './catmaetransaccion/catmaetransaccion.module';
import { PersonaModule } from './catmaepersona/catmaepersona.module';
import { UsuarioModule } from './catmaeusuario/catmaeusuario.module';

@Module({
  imports: [
    CompendioModule,
    DetalleModule,
    CuentaModule,
    TransaccionModule,
    PersonaModule,
    UsuarioModule
  ],
})
export class NotificAppModule {}
