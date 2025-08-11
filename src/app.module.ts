import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: `src/environment/${process.env.NODE_ENV}.env`
    }),
    //MongooseModule.forRoot(`mongodb+srv://eq17001:Pokeluchos2.@cluster0.dfyfmwd.mongodb.net/`),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: `mongodb+srv://${configService.get('mongo.user')}:${configService.get('mongo.password')}@${configService.get('mongo.host')}/${configService.get('mongo.database')}`
    }),

    }),
    PermissionsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
