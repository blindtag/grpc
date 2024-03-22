import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './entity/users.entity';

@Module({
  imports:[
    DatabaseModule,
    DatabaseModule.forFeature([{
      name:UsersDocument.name, schema: UsersSchema
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
