import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersOnline } from '../modulos/usersonline/usersonline.entity';
import { Repository } from 'typeorm';
import { Persona } from '../modulos/catmaepersona/catmaepersona.entity';

@WebSocketGateway(3001)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessageGateway');
  private count = 0;

  handleConnection(client: any, ...args: any[]): any {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connections`);
  }

  handleDisconnect(client: any): any {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

}
