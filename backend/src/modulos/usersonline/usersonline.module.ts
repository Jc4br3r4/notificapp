import { Module } from '@nestjs/common';
import { UsersOnline } from './usersonline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOnlineService } from './usersonline.service';
import { AppGateway } from '../../events/app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOnline])],
  providers: [UsersOnlineService, AppGateway],
  controllers: []
})
export class UsersOnlineModule {}
