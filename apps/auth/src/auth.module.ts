import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './users/entity/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '../.env',
        '../../../.env',
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
