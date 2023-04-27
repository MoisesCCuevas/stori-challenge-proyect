import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipientResolver } from '../resolvers/recipient.resolver';
import { RecipientService } from '../services/recipient.service';
import { Recipient, RecipientSchema } from '../models/recipient.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema }
    ])
  ],
  providers: [RecipientResolver, RecipientService],
  exports: [RecipientService]
})
export class RecipientModule {}