import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './catmaeusuario.service';
import { UsuarioDTO } from './catmaeusuario.dto';
import { LoginDTO } from './catmaeusuario.login';

@Controller()
export class UsuarioController {

  constructor(private readonly userService: UsuarioService) {}
  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UsuarioDTO) {
    return this.userService.register(data);
  }
}
