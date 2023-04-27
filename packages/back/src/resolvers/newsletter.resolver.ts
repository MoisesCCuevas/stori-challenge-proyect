import {
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
  async newsletter(@Args('id') id: string) {
    return await this.newsletterService.findNewsletter(id);
  }

  @Query(() => [Newsletter])
  async newsletterList() {
    return await this.newsletterService.newsletterList();
  }

  @Mutation(() => Newsletter)
  async createNewsletter(@Args({ name: 'newsletter' }) newsletter: CreateNewsletter){
    return await this.newsletterService.createNewsletter(newsletter);
  }

  @Mutation(() => String)
  async removeNewsletter(@Args({ name: 'id' }) id: string){
    return await this.newsletterService.removeNewsletter(id);
  }
}