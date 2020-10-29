import { Module } from '@nestjs/common';
import { PersonaService } from './catmaepersona.service';
import { PersonaController } from './catmaepersona.controller';

@Module({
  providers: [PersonaService],
  controllers: [PersonaController]
})
export class PersonaModule {}
