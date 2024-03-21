import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from 'apps/api/src/app.module';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport:Transport.GRPC,
      options:{
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto')
      }
    }
  );
  await app.listen()

}
bootstrap();
