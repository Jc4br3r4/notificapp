import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { TransaccionService } from './catmaetransaccion.service';
import { ValidationPipe } from '../../shared/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../catmaeusuario/usuario.decorator';

@Controller('transaccion')
export class TransaccionController {

  constructor(private transaccionService: TransaccionService) {}

  // @Post('transaccion-terceros')
  // @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  // transaccionTerceros(@User('persona') user, @Body() data: any) {
  //   const { id } = user;
  //   return this.transaccionService.transferenciaTerceros(id, data);
  // }

  @Post('estado-transferencia')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  transaccionTerceros(@User('persona') user, @Body() data: any) {
    return this.transaccionService.estadoTransferencia(user, data);
  }

  @Get('historico/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  saldos(@User('persona') user, @Param('id') id: number) {
    return this.transaccionService.saldos(user, id);
  }

  @Post('cuentas-propias')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  transaccionCuentasPropias(@User('persona') user, @Body() data: any) {
    return this.transaccionService.propiasCuentas(user, data);
  }

  @Get('aceptar-transferencia/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  verTransferenciaPendiente( @Param('id') id: number) {
    return this.transaccionService.verTransferenciaPendiente(id);
  }

  @Post('estado')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  cambiaEstado(@User('persona') user, @Body() data: any) {
    return this.transaccionService.estadoTransferencia(user, data);
  }
}
