import { Module } from '@nestjs/common';
import { RecipientResolver } from '../resolvers/recipient.resolver';
import { RecipientService } from '../services/recipient.service';

@Module({
  imports: [],
  providers: [RecipientResolver, RecipientService],
  exports: [RecipientService]
})
export class RecipientModule {}