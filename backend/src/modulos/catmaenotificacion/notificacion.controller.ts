import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { ValidationPipe } from '../../shared/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../catmaeusuario/usuario.decorator';

@Controller('notificaciones')
export class NotificacionController {

  constructor(private notificacionService: NotificacionService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  listar(@User('persona') user) {
    return this.notificacionService.find(user);
  }

  @Get('/most-recent')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  read(@User('persona') user) {
    return this.notificacionService.mostrecents(user);
  }
}
