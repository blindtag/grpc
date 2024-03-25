import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './entity/users.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports:[
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([{
      name:UsersDocument.name, schema: UsersSchema
    }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository
  ]
})
export class UsersModule {}
