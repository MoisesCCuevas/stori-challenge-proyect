import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailResolver } from '../resolvers/email.resolver';
import { EmailService } from '../services/email.service';
import { NewsletterModule } from './newsletter.module';
import { RecipientModule } from './recipient.module';
import { EmailRegister, EmailRegisterSchema } from '../models/emailRegister.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailRegister.name, schema: EmailRegisterSchema }
    ]),
    NewsletterModule,
    RecipientModule
  ],
  providers: [EmailResolver, EmailService],
})
export class EmailModule {}