import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DetalleService } from './catdetcompendio.service';
import { DetalleCompendioDTO } from './catdetcompendio.dto';

@Controller('detalle-compendio')
export class DetalleController {
  constructor(private readonly detalleService: DetalleService) {}

  @Get()
  find(@Param('compendio') compendio: number) {
    return this.detalleService.find(compendio);
  }

  @Get(':id')
  read(@Param('id') id: number) {
    return this.detalleService.read(id);
  }

  @Post()
  create(@Body() data: DetalleCompendioDTO) {
    return this.detalleService.create(data);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() data: DetalleCompendioDTO) {
    return this.detalleService.update(id,data);
  }

  @Post(':id')
  remove(@Param('id') id: number) {
    return this.detalleService.remove(id);
  }
}
