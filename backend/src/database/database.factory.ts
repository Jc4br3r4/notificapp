import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificaApp implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  get cn() {
    let server: any;
    if (this.config.get('NODE_ENV') !== 'production') {
      server = {
        host: '127.0.0.1',
        //host: 'db',
        port: 5432,
        database: 'notificapp',
        user: 'postgres',
        pass: 'postgres',
        logging: 'all',
        synchronize: true,
        autoLoadEntities: true,
        autoSchemaSync: true,
      };
    } else {
      server = {
        host: this.config.get('host'),
        port: this.config.get('port'),
        database: this.config.get('db'),
        user: this.config.get('user'),
        pass: this.config.get('pass'),
        synchronize: true,
        logging: 'error',
      };
    }

    return server;
  }

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;
    if (connectionManager.has('default')) {
      options = connectionManager.get('default').options;
      await connectionManager.get('default').close();
    } else {
      options = {
        type: 'postgres',
        host: this.cn.host,
        port: this.cn.port,
        database: this.cn.database,
        username: this.cn.user,
        password: this.cn.pass,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: this.cn.synchronize,
        logging: this.cn.logging,
      } as TypeOrmModuleOptions;
    }
    return options;
  }
}
