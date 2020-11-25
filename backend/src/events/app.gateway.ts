import {
  OnGatewayConnection, OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';

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
