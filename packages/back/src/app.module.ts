import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsletterModule } from './modules/newsletter.module';
import { RecipientModule } from './modules/recipient.module';
import { EmailModule } from './modules/email.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'moisesccuevas.webservices@gmail.com',
          pass: 'nesrgraamdpmpcrb',
        },
      }
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
