import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailResolver } from '../resolvers/email.resolver';
import { EmailService } from '../services/email.service';
import { NewsletterModule } from './newsletter.module';
import { RecipientModule } from './recipient.module';
import { EmailRegister, EmailRegisterSchema } from '../models/emailRegister.model';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          host,
          port,
          service,
          password
        } = configService.email;
        return {
          transport: {
            host,
            port,
            secure: true,
            auth: {
              user: service,
              pass: password,
            },
          }
        }
      },
      inject: [config.KEY]
    }),
    MongooseModule.forFeature([
      { name: EmailRegister.name, schema: EmailRegisterSchema }
    ]),
    NewsletterModule,
    RecipientModule
  ],
  providers: [EmailResolver, EmailService],
  exports: [MailerModule]
})
export class EmailModule {}