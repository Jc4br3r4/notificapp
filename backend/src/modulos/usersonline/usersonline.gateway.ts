import {
  ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersOnline } from './usersonline.entity';

@WebSocketGateway(3001, { namespace: 'users'})
export class UsersOnlineGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(@InjectRepository(UsersOnline)
              private usersRepository: Repository<UsersOnline>) {}

  private logger: Logger = new Logger('UserGateway');

  afterInit(server: any): any {
    this.logger.log('UserGateway Initialized');
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(@ConnectedSocket() client: Socket, room: string): Promise<void> {
    client.join(room);
    this.logger.log(room);
    client.emit('joinnedRoom', room)
  }

  @SubscribeMessage('usuario')
  async handleUsers(@ConnectedSocket() client: Socket, @MessageBody() data: any): Promise<void> {

    const usuario = await this.usersRepository.create({
      token: client.id,
      persona: data[0].persona
    });

    const user = await this.usersRepository.save(usuario);

    this.server.emit('user-online', user);
  }
}
