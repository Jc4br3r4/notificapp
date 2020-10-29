import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import { NotificaApp } from './database.factory';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    useClass: NotificaApp,
    inject: [ConfigService],
  }),
];

