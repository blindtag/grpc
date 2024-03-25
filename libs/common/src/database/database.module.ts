import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
       useFactory: (configService: ConfigService) => ({
         uri: configService.get('MONGODB_URI'),
     // return {
       // uri: 'mongodb+srv://root:ken123@cluster0.fuzwn.mongodb.net/grpctrial?retryWrites=true&w=majority',
        //uri: 'mongodb+srv://root:ken123@cluster0.fuzwn.mongodb.net/hrdb2?retryWrites=true&w=majority',
       // useNewUrlParser: true,
      //  useUnifiedTopology: true,
     // };
  //  },
       
      }),
      inject: [ConfigService],
    })

  ],

})

export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}