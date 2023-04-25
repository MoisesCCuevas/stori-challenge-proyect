import {
  Int,
  Resolver,
  Args,
  Query,
  Mutation
} from '@nestjs/graphql';
import { Newsletter } from '../models/newsletter.model';
import { CreateNewsletter } from '../dtos/newsletter.dto';
import { NewsletterService } from '../services/newsletter.service';

@Resolver(() => Newsletter)
export class NewsletterResolver {
  constructor(
    private newsletterService: NewsletterService
  ) {}

  @Query(() => Newsletter)
  async newsletter(@Args('id', { type: () => Int }) id: number) {
    return this.newsletterService.findNewsletter(id);
  }

  @Query(() => [Newsletter])
  async newsletterList() {
    return this.newsletterService.newsletterList();
  }

  @Mutation(() => Newsletter)
  async createNewsletter(@Args({ name: 'newsletter' }) newsletter: CreateNewsletter){
    return this.newsletterService.createNewsletter(newsletter);
  }
}