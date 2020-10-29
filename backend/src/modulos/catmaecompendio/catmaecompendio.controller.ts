import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompendioService } from './catmaecompendio.service';
import { CompendioDTO } from './catmaecompendio.dto';

@Controller('compendio')
export class CompendioController {
  constructor(private readonly compendioService: CompendioService) {}

  @Get()
  find(){
    return this.compendioService.find();
  }

  @Get(':id')
  read(@Param('id') id: number){
    return this.compendioService.read(id);
  }

  @Post()
  create(@Body() data: CompendioDTO) {
    return this.compendioService.create(data);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() data: CompendioDTO) {
    return this.compendioService.update(id,data);
  }

  @Post(':id')
  remove(@Param('id') id: number) {
    return this.compendioService.remove(id);
  }
}
