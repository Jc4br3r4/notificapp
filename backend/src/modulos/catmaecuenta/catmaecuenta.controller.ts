import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../shared/validation.pipe';
import { CuentaService } from './catmaecuenta.service';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../catmaeusuario/usuario.decorator';

@Controller('cuenta')
export class CuentaController {

  constructor(private readonly cuentaService: CuentaService) {}

  @Get('listar')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  listar(@User('persona') user) {
    return this.cuentaService.find(user);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  read(@Param('id') id: number, @User('persona') user) {
    return this.cuentaService.read(id, user);
  }
}
