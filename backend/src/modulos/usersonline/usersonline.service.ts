import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import { AppGateway } from '../../events/app.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersOnline } from './usersonline.entity';


@WebSocketGateway(3001)
export class UsersOnlineService {

    constructor(private gateway: AppGateway,
                @InjectRepository(UsersOnline)
                private usersRepository: Repository<UsersOnline>) {
    }

    @SubscribeMessage('login')
    async handleUsers(@ConnectedSocket() client: Socket, @MessageBody() data: { persona: Persona }): Promise<void> {

      const persona = await this.usersRepository.findOne({
        where: { persona: data[0].id }
      })
      let user;
      if(persona) {
        user = await this.usersRepository.update({
          persona: data[0].id
        }, {
          token: client.id
        })

      } else {
        const usuario = await this.usersRepository.create({
          token: client.id,
          persona: data[0].id
        });
        user = await this.usersRepository.save(usuario);
      }

      this.gateway.server.emit('user-online', user);
    }

    @SubscribeMessage('logout')
    async handleLogout(@ConnectedSocket() client: Socket, @MessageBody() data: string): Promise<void> {
      const usuario = await this.usersRepository.delete({
        token: client.id,
      });

      this.gateway.server.emit('user-logout', usuario);
    }
}
