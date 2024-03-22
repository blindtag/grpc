import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
              '../../.env',
              '../../../../.env',
            ],
          }),
        MongooseModule.forRootAsync({
        useFactory:(configService: ConfigService)=>({
            uri:configService.get('MONGODB_URI'),
        }),
        inject:[ConfigService]
    }),
],
})
export class DatabaseModule  {
    static forFeature(models:ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
