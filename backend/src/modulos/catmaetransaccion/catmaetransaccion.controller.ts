import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
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

}
