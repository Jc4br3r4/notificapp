import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import  AWS from 'aws-sdk';

// const apig = new AWS.ApiGatewayManagementApi({
//   endpoint: process.env.APIG_ENDPOINT,
// });
@WebSocketGateway(3001,{origin: '*:*'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessageGateway');
  private count = 0;

  afterInit(server: Server) {

    console.log('=============================SERVER===============');
    console.log(server);
    console.log('=============================END SERVER===============');
    this.logger.log('Gateway inits');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connections`);
  }

  handleDisconnect(client: any): any {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

}
