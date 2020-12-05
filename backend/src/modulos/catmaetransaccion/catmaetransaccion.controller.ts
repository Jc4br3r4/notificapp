import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { TransaccionService } from './catmaetransaccion.service';
import { ValidationPipe } from '../../shared/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../catmaeusuario/usuario.decorator';

@Controller('transaccion')
export class TransaccionController {

  constructor(private transaccionService: TransaccionService) {}

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

  @Get('confirmar-transferencia/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  verConfirmacionTransfernecia( @Param('id') id: number) {
    return this.transaccionService.verConfirmacionTransfernecia(id);
  }

  @Post('estado')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  cambiaEstado(@User('persona') user, @Body() data: any) {
    return this.transaccionService.cambiaEstadoTransferencia(user, data);
  }

  @Post('confirma')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  confirmarEstadoTransferencia(@User('persona') user, @Body() data: any) {
    return this.transaccionService.confirmarEstadoTransferencia(user, data);
  }

}
