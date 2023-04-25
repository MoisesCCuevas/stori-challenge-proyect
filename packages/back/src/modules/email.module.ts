import { Module } from '@nestjs/common';
import { EmailResolver } from '../resolvers/email.resolver';
import { EmailService } from '../services/email.service';
import { NewsletterModule } from './newsletter.module';
import { RecipientModule } from './recipient.module';

@Module({
  imports: [NewsletterModule, RecipientModule],
  providers: [EmailResolver, EmailService],
})
export class EmailModule {}