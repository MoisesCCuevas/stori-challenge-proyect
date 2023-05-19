import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipientResolver } from '../resolvers/recipient.resolver';
import { RecipientService } from '../services/recipient.service';
import { NewsletterModule } from './newsletter.module';
import { Recipient, RecipientSchema } from '../models/recipient.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema }
    ]),
    NewsletterModule
  ],
  providers: [RecipientResolver, RecipientService],
  exports: [RecipientService]
})
export class RecipientModule {}