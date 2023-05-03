import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsletterModule } from './modules/newsletter.module';
import { RecipientModule } from './modules/recipient.module';
import { EmailModule } from './modules/email.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    NewsletterModule,
    RecipientModule,
    EmailModule
  ],
  controllers: [AppController],
})
export class AppModule {}
