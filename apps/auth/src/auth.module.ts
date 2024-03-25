import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './users/entity/users.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/repository/users.repository';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [],
  providers: [ ],
})
export class AuthModule {}
