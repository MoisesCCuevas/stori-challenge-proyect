import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterResolver } from '../resolvers/newsletter.resolver';
import { NewsletterService } from '../services/newsletter.service';
import { Newsletter, NewsletterSchema } from '../models/newsletter.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsletter.name, schema: NewsletterSchema }
    ])
  ],
  providers: [NewsletterService, NewsletterResolver],
  exports: [NewsletterService]
})
export class NewsletterModule {}