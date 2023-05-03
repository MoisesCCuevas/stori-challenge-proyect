import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          user,
          password,
          host,
          port,
          name,
        } = configService.database;
        return {
          uri: `mongodb://${host}:${port}`,
          user,
          pass: password,
          dbName: name
        };
      },
      inject: [config.KEY]
    }),
  ],
  providers: [],
  exports: [MongooseModule]
})
export class DatabaseModule {}
