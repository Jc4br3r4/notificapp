import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsuarioService } from './catmaeusuario.service';
import { UsuarioDTO } from './catmaeusuario.dto';
import { LoginDTO } from './catmaeusuario.login';
import { ValidationPipe } from '../../shared/validation.pipe';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from './usuario.decorator';

@Controller('auth')
export class UsuarioController {

  constructor(private readonly userService: UsuarioService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: LoginDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UsuarioDTO) {
    return this.userService.register(data);
  }

  @Post('cambiar-email')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  cambiarEmail(@Body() data: any) {
    return this.userService.cambiarEmail(data);
  }

  @Get('whoiam')
  @UseGuards(new AuthGuard())
  async whoami(@User('persona') user) {
    const { id } = user;
    return await this.userService.read(id);
  }
}
