import { Module } from '@nestjs/common';
import { CompendioModule } from './catmaecompendio/catmaecompendio.module';
import { DetalleModule } from './catdetcompendio/catdetcompendio.module';
import { CuentaModule } from './catmaecuenta/catmaecuenta.module';
import { TransaccionModule } from './catmaetransaccion/catmaetransaccion.module';
import { PersonaModule } from './catmaepersona/catmaepersona.module';
import { UsuarioModule } from './catmaeusuario/catmaeusuario.module';
import { UsersOnlineModule } from './usersonline/usersonline.module';
import { NotificacionModule } from './catmaenotificacion/notificacion.module';

@Module({
  imports: [
    CompendioModule,
    DetalleModule,
    CuentaModule,
    TransaccionModule,
    PersonaModule,
    UsuarioModule,
    UsersOnlineModule,
    NotificacionModule
  ],
})
export class NotificAppModule {}
