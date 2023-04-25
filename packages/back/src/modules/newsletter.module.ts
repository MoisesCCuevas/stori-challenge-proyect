import { Module } from '@nestjs/common';
import { NewsletterResolver } from '../resolvers/newsletter.resolver';
import { NewsletterService } from '../services/newsletter.service';

@Module({
  imports: [],
  providers: [NewsletterService, NewsletterResolver],
  exports: [NewsletterService]
})
export class NewsletterModule {}